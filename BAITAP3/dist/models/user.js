import { Model, DataTypes } from "sequelize";
// Class User kế thừa Sequelize Model
class User extends Model {
    id;
    firstName;
    lastName;
    email;
    address;
    // timestamps
    createdAt;
    updatedAt;
    static associate(models) {
        // define association here
    }
}
// Hàm init model
export function initUserModel(sequelize) {
    User.init({
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
    }, {
        sequelize,
        tableName: "Users",
        modelName: "User",
    });
    return User;
}
export default User;
