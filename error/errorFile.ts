export enum STATUS {
  OK = 200,
  CREATED = 201,
  BAD = 404,
}

export interface iError {
  errorMessage: string;
  errorName: string;
  errorSuccess: boolean;
  errorStatus: STATUS;
}

export class errorFile extends Error {
  public readonly errorMessage: string;
  public readonly errorName: string;
  public readonly errorSuccess: boolean = false;
  public readonly errorStatus: STATUS;
  constructor(arggs: iError) {
    super(arggs.errorMessage);

    this.errorName = arggs.errorName;
    this.errorMessage = arggs.errorMessage;
    this.errorStatus = arggs.errorStatus;

    if (this.errorSuccess !== undefined) {
      this.errorSuccess = this.errorSuccess;
    }
    Error.captureStackTrace(this);
  }
}
