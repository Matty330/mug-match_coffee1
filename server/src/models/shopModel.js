import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Profile from './Profile.js';

const Shops = sequelize.define('Shop', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    rating: {
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
        min: 1,
        max: 5
    }
},
message: {
    type: DataTypes.STRING(255)
}
}, {
    tableName: 'shops',
    timestamps: false
});

Profile.hasOne(Shops, {foreignKey: 'user_id'});
Shops.belongsTo(Profile, {foreignKey: 'user_id'});

export default Shops;