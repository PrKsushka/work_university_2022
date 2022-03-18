import { USER_AUTHENTICATED, USER_REGISTERED, USER_UNAUTHENTICATED, USER_UNREGISTERED } from './user.constants';

export function userAuthenticated() {
  return {
    type: USER_AUTHENTICATED,
  };
}

export function userUnauthenticated(param?: string) {
  return {
    type: USER_UNAUTHENTICATED,
    payload: param,
  };
}
export function userRegistered() {
  return {
    type: USER_REGISTERED,
  };
}

export function userUnregistered(param?: string) {
  return {
    type: USER_UNREGISTERED,
    payload: param,
  };
}
