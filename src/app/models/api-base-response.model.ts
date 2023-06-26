interface IApiBaseResponseModel {
  data: any;
  errorMessage: string;
  hasError: boolean;
}

export class ApiBaseResponseModel implements IApiBaseResponseModel {
  data: any;
  errorMessage: any;
  hasError: any;
}

interface IHttpErrorResponseModel {
  url: any;
  message: any;
  status: any;
  statusText: any;
}

export class HttpErrorResponseModel implements IHttpErrorResponseModel {
  url: any;
  message: any;
  status: any;
  statusText: any;
}
