const { SaveData, GetList, AutoGetID, Search } = require("../action/database.action");
const { isEmpty } = require("../config/help");
const db = require("../config/db.connect")
const SaveInvoice = (req, res) => {
    var { date, cus_id, total, adress, status } = req.body;
    var ts = Date.now();
    var date_ob = new Date(ts);
    var date = date_ob.getDate();
    var month = date_ob.getMonth() + 1;
    var year = date_ob.getFullYear();
    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();
    var date_save = year + '-' + month + '-' + date + " " + hours + ":" + minutes + ":" + seconds;
    var message = {};
    if (isEmpty(cus_id)) {
        message.cus_id = "customer id is require";
    } else if (isEmpty(total)) {
        message.total = "total is require";
    } else if (isEmpty(status)) {
        message.ststus = "status is require";
    } else if (isEmpty(adress)) {
        message.adress = "lat long is require"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
    } else {
        var sql = "INSERT INTO tbl_invoice VALUES(NULL,?,?,?,?,?);";
        db.query(sql, [date_save, cus_id, total, adress, status], (err, result, fld) => {
            if (err) {
                res.json({
                    error: true,
                    message: err
                })
            } else {
                res.json({
                    error: false,
                    message: "Save Sucess"
                })
            }
        })
    }
}
const GetInvoice = (req, res) => {
    var end = req.params["end"];
    var start = req.params["start"];
    var message = {};
    if (isEmpty(start)) {
        start = 0;
    } else if (isEmpty(end)) {
        message.end = "end is require to limit data";
    } else if (start > end) {
        message.error = "start can not greater than end";
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
    } else {
        var sql = `SELECT *FROM tbl_invoice ORDER BY id DESC LIMIT ${start},${end}`;
        db.query(sql, (err, result, fld) => {
            if (err) {
                res.json({
                    error: true,
                    message: err
                })
            } else {
                res.json({
                    error: false,
                    result: result
                })
            }
        })
    }
}
const UpdateInvoice = (req, res) => {
    var { id, date, cus_id, total, status } = req.body;
    var message = {};
    var ts = Date.now();
    var date_ob = new Date(ts);
    var date = date_ob.getDate();
    var month = date_ob.getMonth() + 1;
    var year = date_ob.getFullYear();
    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();
    var date_save = year + '-' + month + '-' + date + " " + hours + ":" + minutes + ":" + seconds;
    if (isEmpty(cus_id)) {
        message.cus_id = "customer id is require";
    } else if (isEmpty(total)) {
        message.total = "total is require";
    } else if (isEmpty(status)) {
        message.status = "status is require";
    } else if (isEmpty(id)) {
        message.id = "id is requuire";
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
    } else {
        var sql = `UPDATE tbl_invoice SET date=?,cus_id=?,total=?,status=? WHERE id=?`;
        db.query(sql, [date_save, cus_id, total, status, id], (err, result, fld) => {
            if (err) {
                res.json({
                    error: true,
                    message: err
                })
            } else {
                res.json({
                    errror: false,
                    message: "Update Sucess"
                })
            }
        })
    }
}
const GetLastID = (req, res) => {
    sql = "SELECT id FROM tbl_invoice ORDER BY id DESC LIMIT 0,1";
    db.query(sql, (err, result, fld) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        } else {
            res.json({
                error: false,
                result: result[0]
            })
        }
    })
}
module.exports = {
    SaveInvoice,
    GetInvoice,
    UpdateInvoice,
    GetLastID,
}