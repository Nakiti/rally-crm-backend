import { DataTypes, Model, UUIDV4, type Optional } from 'sequelize';
import sequelize from '../config/database.js';

// Interface for Organization attributes
interface OrganizationAttributes {
  id: string;
  name: string;
  subdomain: string;
  stripeAccountId?: string;
  settings?: object;
  isPubliclyActive: boolean

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

type OrganizationCreationAttributes = Optional<OrganizationAttributes, 'id'>;

class Organization extends Model<OrganizationAttributes, OrganizationCreationAttributes> implements OrganizationAttributes {
  public id!: string;
  public name!: string;
  public subdomain!: string;
  public stripeAccountId!: string;
  public settings!: object;
  public isPubliclyActive!: boolean;

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
  },
  stripeAccountId: {
    type: new DataTypes.STRING(255),
    allowNull: true,
  },
  settings: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  isPubliclyActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'organizations',
  sequelize,
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['subdomain'],
      name: 'unique_subdomain'
    }
  ]
});

export { Organization };
