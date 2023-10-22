import crypto from 'node:crypto';

export abstract class Entity<P = any> {
  private readonly _id: string;

  constructor(protected readonly props: P, id?: string) {
    this._id = id ?? crypto.randomUUID();
  }

  get id() {
    return this._id;
  }

  toJSON(): Required<P & { id: string }> {
    return {
      id: this._id,
      ...this.props,
    } as Required<P & { id: string }>;
  }
}
