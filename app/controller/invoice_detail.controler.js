const { SaveData, GetList, AutoGetID, Search } = require("../action/database.action");
const { isEmpty } = require("../config/help");
const db = require("../config/db.connect")
const SaveInvoiceDetail = (req, res) => {
    var {
        invoice_id,
        product_id,
        qty,
        sellingPrice,
        Amount
    } = req.body;
    var message = {};
    if (isEmpty(invoice_id)) {
        message.invoice_id = "invoice_id id is require";
    } else if (isEmpty(product_id)) {
        message.product_id = "product_id is require";
    } else if (isEmpty(qty)) {
        message.qty = "qty is require";
    } else if (isEmpty(sellingPrice)) {
        message.sellingPrice = "sellingPrice is require";
    } else if (isEmpty(Amount)) {
        message.Amount = "Amount is require";
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
    } else {
        var sql = "INSERT INTO tbl_invoice_detail VALUES(?,?,?,?,?);";
        db.query(sql, [invoice_id, product_id, qty, sellingPrice, Amount], (err, result, fld) => {
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
const GetInvoiceDetail = (req, res) => {
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
        var sql = `SELECT *FROM tbl_invoice_detail ORDER BY invoice_id DESC LIMIT ${start},${end}`;
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

module.exports = {
    SaveInvoiceDetail,
    GetInvoiceDetail,

}