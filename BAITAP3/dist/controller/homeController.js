import db from "../models/index.js"; // import database (index.ts trong models)
import * as CRUDService from "../services/CRUDService.js"; // import service
// hàm getHomePage
const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll();
        console.log(".........................");
        console.log(data);
        console.log(".........................");
        res.render("homepage.ejs", {
            data: JSON.stringify(data),
        });
    }
    catch (e) {
        console.error(e);
    }
};
const getAboutPage = (req, res) => {
    res.render("test/about.ejs");
};
const getCRUD = (req, res) => {
    res.render("crud.ejs");
};
const getFindAllCrud = async (req, res) => {
    const data = await CRUDService.getAllUser();
    res.render("users/findAllUser.ejs", {
        datalist: data,
    });
};
const postCRUD = async (req, res) => {
    const message = await CRUDService.createNewUser(req.body);
    console.log(message);
    res.send("Post crud to server");
};
const getEditCRUD = async (req, res) => {
    const userId = req.query.id; // ép kiểu
    if (userId) {
        const userData = await CRUDService.getUserInfoById(Number(userId)); // ép số
        res.render("users/editUser.ejs", {
            data: userData,
        });
    }
    else {
        res.send("không lấy được id");
    }
};
const putCRUD = async (req, res) => {
    const data = req.body;
    const updatedUsers = await CRUDService.updateUser(data);
    res.render("users/findAllUser.ejs", {
        datalist: updatedUsers,
    });
};
const deleteCRUD = async (req, res) => {
    const id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(Number(id));
        res.send("Deleted!!!!!!!!!!");
    }
    else {
        res.send("Not find user");
    }
};
export default {
    getHomePage,
    getAboutPage,
    getCRUD,
    getFindAllCrud,
    postCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD,
};
