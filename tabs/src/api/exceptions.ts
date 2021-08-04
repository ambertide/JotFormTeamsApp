class BaseException {
  name: string;
  message: string;

  constructor(name: string, message: string) {
    this.name = name;
    this.message = message;
  }
}

/**
 * Thrown when a login exception occurs.
 */
export class LoginException extends BaseException {
  constructor(message: string) {
    super("LoginException", message);
  }
}
