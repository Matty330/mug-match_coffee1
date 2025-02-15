import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Coffee = sequelize.define('Coffee', {
    coffee_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    origin: {
        type: DataTypes.STRING(100)
    },
    roast_level: {
        type: DataTypes.STRING(50)
    },
    caffeine_content: {
        type: DataTypes.STRING(50)
    }
}, {
    tableName: 'coffe_id',
    timestamps: false
});

export default Coffee;