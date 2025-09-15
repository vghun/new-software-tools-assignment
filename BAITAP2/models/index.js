import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";   
import { Sequelize, DataTypes } from "sequelize";
import process from "process";
import configFile from "../config/config.json" with { type: "json" };


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configFile[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// đọc tất cả model trong folder models
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const fileUrl = pathToFileURL(path.join(__dirname, file)); // 👈 convert path -> file://
    import(fileUrl).then((modelModule) => {
      const model = modelModule.default(sequelize, DataTypes);
      db[model.name] = model;
    });
  });

// associate nếu có
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
