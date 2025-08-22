import db from '../models/index.js'; // import database
import * as CRUDService from '../services/CRUDService.js'; // import service

// hàm getHomePage
const getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('.........................');
        console.log(data);
        console.log('.........................');
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
};

const getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
};

const getCRUD = (req, res) => {
    return res.render('crud.ejs');
};

const getFindAllCrud = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('users/findAllUser.ejs', {
        datalist: data
    });
};

const postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('Post crud to server');
};

const getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        return res.render('users/editUser.ejs', {
            data: userData
        });
    } else {
        return res.send('không lấy được id');
    }
};

const putCRUD = async (req, res) => {
    let data = req.body;
    let data1 = await CRUDService.updateUser(data);
    return res.render('users/findAllUser.ejs', {
        datalist: data1
    });
};

const deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Deleted!!!!!!!!!!');
    } else {
        return res.send('Not find user');
    }
};


export default {
    getHomePage,
    getAboutPage,
    getCRUD,
    getFindAllCrud,   // nhớ export đúng tên
    postCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD
};
