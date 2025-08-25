import { Model, DataTypes, Optional, Sequelize } from "sequelize";

// Định nghĩa attributes của User
interface UserAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Cho phép id, createdAt, updatedAt được optional khi tạo mới
interface UserCreationAttributes extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

// Class User kế thừa Sequelize Model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public address!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // define association here
  }
}

// Hàm init model
export function initUserModel(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "Users",
      modelName: "User",
    }
  );
  return User;
}

export default User;
