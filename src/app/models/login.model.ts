export class LoginRequestModel implements ILoginRequestModel {
  username: any;
  password: any;
}

export interface ILoginRequestModel {
  username: any;
  password: any;
  data?: any;
  errorMessage?: string;
  hasError?: boolean;
}

export interface IAuthorizationModel {
  view: boolean;
  create: boolean;
  update: boolean;
  approve: boolean;
}

export class AuthorizationModel implements IAuthorizationModel {
  view: boolean = false;
  create: boolean = false;
  update: boolean = false;
  approve: boolean = false;
}

export interface IUserAuthorizationsModel {
  campaignDefinitionModuleAuthorizations: IAuthorizationModel;
  customerDefinitionModuleAuthorizations: IAuthorizationModel;
  campaignLimitsModuleAuthorizations: IAuthorizationModel;
  targetDefinitionModuleAuthorizations: IAuthorizationModel;
  couponsModuleAuthorizations: IAuthorizationModel;
  reportsModuleAuthorizations: IAuthorizationModel;
}

export class UserAuthorizationsModel implements IUserAuthorizationsModel {
  campaignDefinitionModuleAuthorizations: AuthorizationModel = new AuthorizationModel();
  customerDefinitionModuleAuthorizations: AuthorizationModel = new AuthorizationModel();
  campaignLimitsModuleAuthorizations: AuthorizationModel = new AuthorizationModel();
  targetDefinitionModuleAuthorizations: AuthorizationModel = new AuthorizationModel();
  couponsModuleAuthorizations: AuthorizationModel = new AuthorizationModel();
  reportsModuleAuthorizations: AuthorizationModel = new AuthorizationModel();
}
