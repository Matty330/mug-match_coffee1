import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/database.js'; 

import Profile from'./model/profileModel.js';
import Shops from'./model/shopModel.js';
import Coffee from './model/coffeeModel.js';
import Preference from'./model/preferenceModel.js';

import homeRoute from './routes/homeRoute.js';
import shopRoute from './routes/shopRoute.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.resolve(__dirname, '.env') });


console.log("DEBUG: Loaded DATABASE_URL ->", process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is still missing");
    process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5173;


app.use(express.json());


console.log("server.js file is executing...");

Profile.hasMany(Shops, { foreignKey: 'user_id' });
Shops.belongsTo(Profile, { foreignKey: 'user_id' });

Profile.hasMany(Preference, { foreignKey: 'user_id' });
Preference.belongsTo(Profile, { foreignKey: 'user_id' });

Coffee.hasMany(Preference, { foreignKey: 'coffee_id' });
Preference.belongsTo(Coffee, { foreignKey: 'coffee_id' });

app.use('/api', homeRoute)
app.use('/api/mapAPI', shopRoute);



sequelize.sync()
.then(() => {
    console.log('All models synced successfully.');
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    });
})
.catch (err => {
    console.error('Database sync failed', err);
    process.exit(1);
});

