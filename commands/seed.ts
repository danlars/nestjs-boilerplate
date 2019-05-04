import * as glob from 'glob';
import chalk from 'chalk';
import * as path from 'path';
import { getConnectionOptions, createConnection, QueryRunner } from 'typeorm';

const run = async () => {
  let ormconfig;
  const normalizePath = path.normalize(`database/seeds/*.ts`);
  const seedFiles: string[] = glob.sync(normalizePath, {nodir: true});
  console.log(chalk.greenBright('Fetching TypeORM Connection'));

  try {
    ormconfig = await getConnectionOptions();
  } catch (e) {
    ormconfig = require('ormconfig.json');
  }

  console.log(chalk.greenBright('Establishing Database Connection'));
  const connection = await createConnection(ormconfig);
  const queryRunner: QueryRunner = connection.createQueryRunner();

  console.log(chalk.greenBright('Seeding files...'));
  for (const seed of seedFiles) {
    try {
      console.log(`Seeding ${chalk.greenBright(seed)}...`);
      const seedFile = require(`./../${seed}`);
      await seedFile.seed(queryRunner);
      if (queryRunner.isTransactionActive) {
        await queryRunner.commitTransaction();
      }
    } catch (e) {
      console.log(`Unable to seed ${chalk.redBright(seed)}`);
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
