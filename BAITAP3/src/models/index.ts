import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import process from "process";
import configFile from "../config/config.json" with { type: "json" };
import { fileURLToPath, pathToFileURL } from "url";

// Tạo __filename và __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || "development";
const config = (configFile as any)[env];

const basename = path.basename(__filename);
const db: Record<string, any> = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

async function loadModels() {
  const files = fs.readdirSync(__dirname).filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      (file.endsWith(".ts") || file.endsWith(".js")) &&
      !file.includes(".test.")
    );
  });

  for (const file of files) {
    const modelPath = path.join(__dirname, file);
    const modelModule = await import(pathToFileURL(modelPath).href);

    // Sửa ở đây: gọi hàm initUserModel, không gọi default như function
    // Giả sử các model export hàm initUserModel
    const model = modelModule.initUserModel(sequelize);
    db[model.name] = model;
  }

  for (const modelName of Object.keys(db)) {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  }
}

await loadModels();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
