import { DataTypes } from Sequelize;
import sequelize from '../config/database.js'
import Profile from './profileModel.js';
import Coffee from './coffeeModel.js';

const Preference = sequelize.define('Preference', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Profile,
            key: 'user_id'
        }
    },
    coffee_id: {
        type: DataTypes.INTEGER,
        reference: {
            model: Coffee,
            key: 'coffee_id'
        }
    },
    ingredients: {
        type: DataTypes.STRING(255)
    },
    temperature: {
        type: DataTypes.STRING(50)
    }
}, {
    tableName: 'preference',
    timestamp: false
});

Profile.hasOne(Preference, {foreignKey: 'user_id'});
Preference.belongsTo(Profile, {foreignKey: 'user_id'});

Coffee.hasOne(Preference, {foreignKey: 'coffee_id'});
Preference.belongsTo(Coffee, { foreignKey: 'coffe_id'});

export default Preference;