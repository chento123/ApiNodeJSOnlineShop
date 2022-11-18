const invoice = (app) => {
    const router = require("express").Router();
    const { GetInvoiceDetail, SaveInvoiceDetail } = require("../controller/invoice_detail.controler");
    const validateToken = require("../auth/validateToken.controller");
    router.get("/invoice-detail/:start/:end", GetInvoiceDetail);
    router.post("/invoice-detail", SaveInvoiceDetail);
    app.use(router);
}
module.exports = invoice;