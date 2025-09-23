import { Sequelize, UUIDV4 } from 'sequelize';
declare const sequelize: Sequelize;
/**
 * Connects to the database and authenticates the connection.
 * This function should be called once when the server starts.
 */
export declare const connectDb: () => Promise<void>;
export { UUIDV4 };
export default sequelize;
//# sourceMappingURL=database.d.ts.map