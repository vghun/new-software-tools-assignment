import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import process from "process";
import configFile from "../config/config.json";
const env = process.env.NODE_ENV || "development";
const config = configFile[env];
const basename = path.basename(__filename);
const db = {};
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
}
else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}
// Load tất cả model trong folder models (trừ index.ts)
const files = fs.readdirSync(__dirname).filter((file) => {
    return (file.indexOf(".") !== 0 &&
        file !== basename &&
        (file.endsWith(".ts") || file.endsWith(".js")) &&
        !file.includes(".test."));
});
for (const file of files) {
    const modelPath = path.join(__dirname, file);
    const modelModule = await import(modelPath);
    const model = modelModule.default(sequelize, DataTypes);
    db[model.name] = model;
}
// Associate nếu có
for (const modelName of Object.keys(db)) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
