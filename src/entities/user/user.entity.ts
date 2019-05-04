import {
  AfterInsert,
  AfterUpdate,
  BaseEntity,
  BeforeInsert, BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  firstname: string;

  @Column({ type: 'varchar' })
  lastname: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ select: false, type: 'varchar', nullable: false, unique: true })
  password: string;

  @Column({ name: 'remember_token', select: false, type: 'varchar', nullable: true, unique: true })
  rememberToken: string;

  @UpdateDateColumn({ type: 'datetime' })
    // tslint:disable-next-line:variable-name
  updated_at: string;

  @CreateDateColumn({ type: 'datetime' })
    // tslint:disable-next-line:variable-name
  created_at: string;

  @BeforeInsert()
  @BeforeUpdate()
  beforeModify() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }

  @AfterInsert()
  @AfterUpdate()
  resetPassword() {
    delete this.password;
  }
}
