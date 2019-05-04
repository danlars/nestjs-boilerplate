import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class createUsersTable1553953833776 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                new TableColumn({
                    name: 'id',
                    isPrimary: true,
                    type: 'integer',
                    unsigned: true,
                    generationStrategy: 'increment',
                }),
                new TableColumn({
                    name: 'firstname',
                    type: 'varchar',
                    isNullable: false,
                }),
                new TableColumn({
                    name: 'lastname',
                    type: 'varchar',
                    isNullable: true,
                }),
                new TableColumn({
                    name: 'email',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true,
                }),
                new TableColumn({
                    name: 'password',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true,
                }),
                new TableColumn({
                    name: 'remember_token',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                    isUnique: true,
                }),
                new TableColumn({
                    name: 'updated_at',
                    type: 'datetime',
                    isNullable: false,
                }),
                new TableColumn({
                    name: 'created_at',
                    type: 'datetime',
                    isNullable: false,
                }),
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('users', true);
    }

}
