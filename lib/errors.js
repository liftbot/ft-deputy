'use strict';

class FTError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FTError';
    this.message = message;
    this.stack = (new Error()).stack;
  }
}

class AuthError extends FTError {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
    this.code = 401;
    this.message = message || 'Unauthorization';
  }
}

class ReqError extends FTError {
  constructor(message) {
    super(message);
    this.name = 'ReqError';
    this.message = message || 'Bad Request';
    this.code = 400;
    this.stack = (new FTError()).stack;
  }
}

// TODO: sufficient status codes
class ReqParamsError extends FTError {
  constructor(message) {
    super(message);
    this.name = 'ParamsError';
    this.code = 438;
    this.message = message || 'Bad Params';
  }
}

class NotFoundError extends FTError {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.code = 404;
    this.message = message || 'Not Found';
  }
}

class PermissionError extends FTError {
  constructor(message) {
    super(message);
    this.name = 'PermissionError';
    this.code = 403;
    this.message = message || 'Not Have PermissionError';
  }
}

module.exports = {
  FTError: FTError,
  AuthError: AuthError,
  ReqError: ReqError,
  ReqParamsError: ReqParamsError,
  NotFoundError: NotFoundError,
  PermissionError: PermissionError
};
