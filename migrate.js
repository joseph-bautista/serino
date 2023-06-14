const sequelize = require('./db');
require('./models/User');
require('./models/Treasure');
require('./models/MoneyValue');

const runMigration = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database migrated successfully');
  } catch (error) {
    console.error('Error migrating database:', error);
  } finally {
    process.exit();
  }
};

runMigration();
