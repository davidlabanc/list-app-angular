export class ApiError <T = any> extends Error {
  constructor(public status: number, public operation: string, public errorData: T) {
    super(`API Error ${status}`);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}