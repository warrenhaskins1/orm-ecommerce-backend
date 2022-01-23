const { Model, DataTypes } = require("sequelize");
const { truncate } = require("../config/connection");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
  // define columns
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataType.INTEGER,
      //Need to Ref Products model id
    },
    tag_id: {
      type: DataTypes.INTEGER,
      //Need Ref to Tag models id
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;
