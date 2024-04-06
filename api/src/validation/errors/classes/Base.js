class Base {
  constructor(type, title, status, message, detail, requestId, subErrors) {
    this.type = type;
    this.title = title;
    this.status = status;
    this.message = message;
    this.detail = detail;
    this.requestId = requestId;
    this.subErrors = subErrors;
  }

  *[Symbol.iterator]() {
    yield this.type;
    yield this.title;
    yield this.status;
    yield this.message;
    yield this.detail;
    yield this.requestId;
    yield this.subErrors;
  }
}

export default Base;
