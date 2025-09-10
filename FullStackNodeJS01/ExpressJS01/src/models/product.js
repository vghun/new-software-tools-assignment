'use strict';
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Product thuộc về 1 Category
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
     imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id"
        },
        onDelete: "CASCADE"
      }
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products"
    }
  );

  return Product;
};
