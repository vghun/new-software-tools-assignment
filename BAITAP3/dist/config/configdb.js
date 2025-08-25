import { Sequelize } from "sequelize";
// Tạo instance Sequelize với cấu hình DB
const sequelize = new Sequelize("baitap3", "root", "123456789", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});
// Hàm connect DB
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
export default connectDB;
export { sequelize }; // Export thêm để models có thể dùng instance này
