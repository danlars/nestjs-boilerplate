import { DeleteResult } from 'typeorm';

export class MockUserEntity {
  find() {
    return new Promise((resolve) => resolve([]));
  }

  findOne() {
    return new Promise((resolve) => resolve(this));
  }

  create(dto) {
    const data = Object.assign(this, dto);
    // tslint:disable-next-line:forin
    for (const param in data) {
      // @ts-ignore
      this[param] = data[param];
    }
    return this;
  }

  save() {
    return new Promise((resolve) => resolve(this));
  }

  delete() {
    return new Promise((resolve) => resolve(new DeleteResult()));
  }

  createQueryBuilder() {
    return jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      orWhere: jest.fn().mockReturnThis(),
    }))();
  }
}
