import { ModalResult } from './modalResult';

export class ModalQuery {
  public ModalId: string;
  public Data: any;
  public ModalResult: ModalResult;

  constructor(modalId: string, data: any = null, modalResult: ModalResult = new ModalResult()) {
    this.ModalId = modalId;
    this.Data = data;
    this.ModalResult = modalResult;
  }
}
