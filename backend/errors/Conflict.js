class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
    this.name = 'Conflict';
  }
}
module.exports = ConflictError;
