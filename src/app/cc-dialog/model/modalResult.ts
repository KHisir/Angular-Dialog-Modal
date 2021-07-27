import { ModalResultAction } from './enums/modalResultAction';

export class ModalResult {
  public PromiseResult: Promise<any>;

  public ResultAction: ModalResultAction;
  public Data: any;

  private promiseResolve: any;
  private promiseReject: any;

  constructor() {
    this.PromiseResult = new Promise((resolve, reject) => {
      this.promiseResolve = resolve;
      this.promiseReject = reject;
    });

    this.ResultAction = ModalResultAction.Close;
    this.Data = null;
  }

  public ResolvePromise() {
    this.promiseResolve(this);
  }

  public RejectPromise() {
    this.promiseReject(this);
  }
}
