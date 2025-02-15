import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: console.log, // Enable logging to debug connection
});

sequelize.authenticate()
    .then(() => console.log('✅ Database connection successful!'))
    .catch(err => console.error('❌ Database connection failed:', err));

export default sequelize;
