export class DomainError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = new.target.name;
  }
}

export class NotFoundError extends DomainError {}
export class ConflictError extends DomainError {}
export class ValidationError extends DomainError {}
