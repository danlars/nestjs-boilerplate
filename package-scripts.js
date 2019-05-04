const { series } = require('nps-utils');

module.exports = {
  scripts: {
    default: "nps db.setup",
    db: {
      drop: {
        description: "Drops the schema of the database",
        script: runFast("./node_modules/typeorm/cli.js schema:drop"),
      },
      migrate: {
        description: "Migrates the database to newest version available",
        script: runFast("./node_modules/typeorm/cli.js migration:run"),
      },
      revert: {
        description: "Downgrades the database",
        script: runFast("./node_modules/typeorm/cli.js migration:revert"),
      },
      seed: {
        description: "Seed generated records to the database",
        script: runFast("./commands/seed.ts"),
      },
      setup: {
        description: "Recreates the database with seeded data",
        script: series("nps db.drop", "nps db.migrate", "nps db.seed"),
      },
    },
  },
};

function runFast(path) {
  return `ts-node -T ${path}`;
}
