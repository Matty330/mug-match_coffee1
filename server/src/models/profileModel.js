import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Profile = sequelize.define('Profile',{
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
        isEmail: true
    }
},
username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
},
password: {
    type: DataTypes.STRING(255),
    allowNull: false
}
}, {
    tableName: 'profile',
    timestamps: false
});

export default Profile;