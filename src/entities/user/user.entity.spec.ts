import 'reflect-metadata';
import { UserEntity } from './user.entity';

describe('UserEntity', () => {
  let service: UserEntity;

  beforeEach(async () => {
    service = new UserEntity();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash password when calling beforeModfiy method', () => {
    const pass = 'velkommen';
    service.password = pass;
    service.beforeModify();
    expect(service.password).not.toEqual(pass);
  });

  it('should not hash password when calling beforeModfiy method', () => {
    service.beforeModify();
    expect(service.password).toEqual(undefined);
  });

  it('should remove password when calling resetPassword method', () => {
    service.password = 'velkommen';
    service.resetPassword();
    expect(service.password).toBe(undefined);
  });
});
