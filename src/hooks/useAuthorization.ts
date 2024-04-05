import { httpTool } from '../$http/index';

interface IAuthorizationUtil {
  authorizeFromToken(token: string): boolean;
  authorizeFromStorage(): boolean;
  revoke(): boolean;
}

class AuthorizationUtil implements IAuthorizationUtil {
  private localTokenKey = 'token';

  authorizeFromToken(token: string): boolean {
    httpTool.setAuthorization(token);
    localStorage.setItem(this.localTokenKey, token);
    return true;
  }

  authorizeFromStorage(): boolean {
    const token = localStorage.getItem(this.localTokenKey);
    if (token) {
      return this.authorizeFromToken(token);
    }
    return false;
  }

  revoke(): boolean {
    localStorage.removeItem(this.localTokenKey);
    httpTool.removeAuthorization();
    return true;
  }
}

const authorizationUtil = new AuthorizationUtil();

export const useAuthorization = () => {
  return authorizationUtil;
};
