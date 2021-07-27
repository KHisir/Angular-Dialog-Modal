import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from './modal.service';
import { ModalResultAction } from './model/enums/modalResultAction';
import { ModalQuery } from './model/modalQuery';
import { ModalResult } from './model/modalResult';

@Component({
  selector: 'app-cc-dialog',
  templateUrl: './cc-dialog.component.html',
  styleUrls: ['./cc-dialog.component.scss']
})
export class CcDialogComponent implements OnInit {

  subscription!: Subscription;

  @Input() id: string = '';
  @Input() title: string = 'Modal title';
  @Input() subtitle: string = '';
  @Input() backdrop: boolean = true;
  @Input() width: string = '500px'; // px, %, vw
  @Input() height: string = '300px'; // px, %, vh
  @Input() verticallyCentered: boolean = false;
  @Input() help: boolean = true;
  @Input() closeable: boolean = true;
  @Input() fullscreenable: boolean = true;
  @Input() dismissable: boolean = false;
  @Input() secondaryButtonText: string = 'Discard';
  @Input() primaryButtonText: string = 'OK';
  @Input() showTitlebar = true;
  @Input() showFooter = true;

  zIndexStart: number = 1000;
  zIndex: number = 0;
  openModal: boolean = false;
  data: any = null;
  modalResult!: ModalResult;

  fullscreen: boolean = false;

  // Child to Parent: Sharing Data via Output() and EventEmitter
  @Output() onAction = new EventEmitter<any>();

  // clickEventsubscription: Subscription;

  @ViewChild('wrapper', { static: true }) wrapper!: ElementRef;
  @HostListener('window:resize')
  onResize() {
    // auto resizing when window width/height smaller than inputs!
    if (this.wrapper !== undefined) {
      let w: number = 0;
      let h: number = 0;

      // console.log(window.screen.availWidth);
      // console.log(window.screen.availHeight);
      // console.log(window.outerWidth);
      // console.log(window.outerHeight);

      if (this.width.includes('px')) {
        w = Number(this.width.replace('px', ''));
      } else if (this.width.includes('%')) {
        w = Number(this.width.replace('%', ''));
      } else {
        w = Number(this.width);
      }

      if (this.height.includes('px')) {
        h = Number(this.height.replace('px', ''));
      } else if (this.height.includes('%')) {
        h = Number(this.height.replace('%', ''));
      } else {
        h = Number(this.height);
      }

      if (this.width.includes('px')) {
        if (w >= window.innerWidth) {
          this.wrapper.nativeElement.style.width = '95%';
        } else {
          this.wrapper.nativeElement.style.width = this.width;
        }
      }

      if (this.height.includes('px')) {
        if (h >= window.innerHeight) {
          if (this.verticallyCentered === true) {
            this.wrapper.nativeElement.style.height = '95%';
          } else {
            this.wrapper.nativeElement.style.height = 'calc(95% - 10px)'; // #wrapper-margin:10
          }
        } else {
          this.wrapper.nativeElement.style.height = this.height;
        }
      }

      if (this.width.includes('%')) {
        const screenWidthInPercent: number = ((100 / window.screen.availWidth) * window.innerWidth);
        if (w >= screenWidthInPercent) {
          this.wrapper.nativeElement.style.width = '95%';
        } else {
          this.wrapper.nativeElement.style.width = this.width;
        }
      }

      if (this.height.includes('%')) {
        const screenHeightInPercent: number = ((100 / window.screen.availHeight) * window.innerHeight);
        if (h >= screenHeightInPercent) {
          if (this.verticallyCentered === true) {
            this.wrapper.nativeElement.style.height = '95%';
          } else {
            this.wrapper.nativeElement.style.height = 'calc(95% - 10px)'; // #wrapper-margin:10
          }
        } else {
          this.wrapper.nativeElement.style.height = this.height;
        }
      }

    }
  }

  constructor(private modalService: ModalService) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.modalService.onOpen().subscribe((res: ModalQuery) => {
      if (this.id === res.ModalId) {
        this.openModal = true;
        this.data = res.Data;
        this.modalResult = res.ModalResult;

        const allShowedDialogs: any = document.querySelectorAll('#cc-modal.show');
        this.zIndex = this.zIndexStart + allShowedDialogs.length;

        setTimeout(() => {
          this.onResize();
        }, 1);
      } else {
        // this.openModal = false;
      }
    });

    this.modalService.onClose().subscribe((modalId: string) => {
      if (this.id === modalId) {
        this.openModal = false;
      }
    });
  }

  helpOnclick(): void {
    this.modalResult.ResultAction = ModalResultAction.Help;
    this.onAction.emit(this.modalResult);
  }

  fullscreenOnclick(val: boolean): void {
    const oldSFullscreenState: boolean = this.fullscreen;
    this.fullscreen = val;

    if (val === false && oldSFullscreenState === true) {
      setTimeout(() => {
        this.onResize();
      }, 300);
    }
  }

  closeByBackdrop(event: any): void {
    const target = event.target || event.srcElement || event.currentTarget;
    if (this.dismissable === true && target.classList.contains('backdrop')) {
      this.closeOnclick();
    }
  }

  closeOnclick(): void {
    this.modalResult.ResultAction = ModalResultAction.Close;
    this.onAction.emit(this.modalResult);
  }

  primaryBtnOnclick(): void {
    this.modalResult.ResultAction = ModalResultAction.PrimaryBtn;
    this.onAction.emit(this.modalResult);
  }

  secondaryBtnOnclick(): void {
    this.modalResult.ResultAction = ModalResultAction.SecondaryBtn;
    this.onAction.emit(this.modalResult);
  }

}
