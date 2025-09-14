import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../config/database';

// Interface for Organization attributes
interface OrganizationAttributes {
  id: string;
  name: string;
  subdomain: string;
  stripeAccountId?: string;
  settings?: object;
}

type OrganizationCreationAttributes = Optional<OrganizationAttributes, 'id'>;

class Organization extends Model<OrganizationAttributes, OrganizationCreationAttributes> implements OrganizationAttributes {
  public id!: string;
  public name!: string;
  public subdomain!: string;
  public stripeAccountId!: string;
  public settings!: object;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Organization.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  subdomain: {
    type: new DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  stripeAccountId: {
    type: new DataTypes.STRING(255),
    allowNull: true,
  },
  settings: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  tableName: 'organizations',
  sequelize, // Pass the connection instance
});

export { Organization };
