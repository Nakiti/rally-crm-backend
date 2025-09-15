import { Sequelize } from 'sequelize';

console.log("🚀 Starting database connection test...");

const sequelize = new Sequelize(
  "rally_dev",
  "root",
  "password",
  {
    host: "127.0.0.1",
    port: 3306,
    dialect: 'mysql',
    logging: (sql) => console.log("SQL:", sql), // Log everything
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅✅✅ CONNECTION SUCCESSFUL! ✅✅✅");
  } catch (error) {
    console.error("❌❌❌ CONNECTION FAILED! ❌❌❌");
    console.error(error); // Log the full error object
  } finally {
    await sequelize.close();
    console.log("🔌 Connection closed.");
  }
};

testConnection();