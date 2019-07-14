import chalk from 'chalk';
import { getConnectionOptions, createConnection, QueryRunner } from 'typeorm';
import { Users } from '../database/seeds/users';

const seedCollection: any[] = [
  Users,
];

const run = async () => {
  let ormconfig;
  console.log(chalk.greenBright('Establishing TypeORM Connection'));

  try {
    ormconfig = await getConnectionOptions();
  } catch (e) {
    ormconfig = require('ormconfig.json');
  }

  console.log(chalk.greenBright('Establishing Database Connection'));
  const connection = await createConnection(ormconfig);
  const queryRunner: QueryRunner = connection.createQueryRunner();

  console.log(chalk.greenBright('Seeding files...'));
  for (const seeder of seedCollection) {
    try {
      console.log(`Seeding ${chalk.greenBright(seeder.name)}...`);
      await seeder.seed(queryRunner);
      if (queryRunner.isTransactionActive) {
        await queryRunner.commitTransaction();
      }
    } catch (e) {
      console.log(`Unable to seed ${chalk.redBright(seeder.name)}`);
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
    }
  }

  console.log(chalk.greenBright('Seed Done'));
  await queryRunner.release();
  await connection.close();
  process.exit();
};

run();
