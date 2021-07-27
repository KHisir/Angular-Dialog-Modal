import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ModalQuery } from './model/modalQuery';
import { ModalResult } from './model/modalResult';


@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private opening = new Subject<ModalQuery>();
  private closing = new Subject<string>();

  constructor() {}

  onOpen(): Observable<any> {
    return this.opening.asObservable();
  }

  onClose(): Observable<any> {
    return this.closing.asObservable();
  }

  public open(modalId: string, data: any = null): Promise<any> {
    const modalResult: ModalResult = new ModalResult();
    this.opening.next(new ModalQuery(modalId, data, modalResult));

    return modalResult.PromiseResult;
  }

  public close(modalId: string) {
    this.closing.next(modalId);
  }
}
