import { UserEntity } from './user.entity';

describe('User.Entity', () => {
  it('should be defined', () => {
    expect(new UserEntity()).toBeDefined();
  });
});
