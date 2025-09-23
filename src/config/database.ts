import { Sequelize, UUIDV4 } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Ensure all required environment variables are present
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_HOST) {
  throw new Error('Missing required database environment variables (DB_NAME, DB_USER, DB_HOST)');
}

// Initialize the Sequelize instance with database credentials from environment variables.
// This creates a connection pool that will be used by all models.
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER, 
  process.env.DB_PASSWORD,
  { 
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Log SQL queries in development
    pool: {
      max: 5,
      min: 0,
      acquire: 30000, 
      idle: 10000,
    },
  }
);

/**
 * Connects to the database and authenticates the connection.
 * This function should be called once when the server starts.
 */
export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true })
    console.log('✅ Database connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:');
    // Re-throw the error to be caught by the server's startup logic
    throw error;
  }
};

export {UUIDV4}

export default sequelize;

