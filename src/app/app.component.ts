import { Component } from '@angular/core';
import { ModalService } from './cc-dialog/modal.service';
import { ModalResultAction } from './cc-dialog/model/enums/modalResultAction';
import { ModalResult } from './cc-dialog/model/modalResult';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cc-dialog';

  constructor(private modalService: ModalService) {}

  openModal1(): void {
    this.modalService.open('modal1').then((res: ModalResult) => {
      alert('Modal1 is closing!');
      console.log(res);
    }).catch((err: any) => { });
  }

  openModal2(): void {
    this.modalService.open('modal2').then((res: ModalResult) => {
      alert('Modal2 is closing!');
      console.log(res);
    }).catch((err: any) => { });
  }

  openModal3(): void {
    this.modalService.open('modal3').then((res: ModalResult) => {
      alert('Modal3 is closing!');
      console.log(res);
    }).catch((err: any) => { });
  }

  modal1OnAction(modalResult: ModalResult): void {
    /** Do what you want here! Maybe validation */
    
    switch (modalResult.ResultAction) {
      case ModalResultAction.PrimaryBtn:
        break;
      case ModalResultAction.SecondaryBtn:
        break;
      case ModalResultAction.Close:
        break;
      case ModalResultAction.Help:
        break;

      default:
        break;
    }

    this.modalService.close('modal1');
    modalResult.ResolvePromise(); // or modalResult.RejectPromise()
  }

  modal2OnAction(modalResult: ModalResult): void {
    /** Do what you want here! Maybe validation */

    switch (modalResult.ResultAction) {
      case ModalResultAction.PrimaryBtn:
        break;
      case ModalResultAction.SecondaryBtn:
        break;
      case ModalResultAction.Close:
        break;
      case ModalResultAction.Help:
        break;

      default:
        break;
    }

    this.modalService.close('modal2');
    modalResult.ResolvePromise(); // or modalResult.RejectPromise()
  }

  modal3OnAction(modalResult: ModalResult): void {
    this.modalService.close('modal3');
    modalResult.ResolvePromise(); // or modalResult.RejectPromise()
  }
}
