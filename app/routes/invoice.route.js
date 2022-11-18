const invoice = (app) => {
    const router = require("express").Router();
    const { GetInvoice, SaveInvoice, UpdateInvoice, GetLastID } = require("../controller/invoice.controller");
    const validateToken = require("../auth/validateToken.controller");
    router.get("/invoice/:start/:end", GetInvoice);
    router.post("/invoice", validateToken, SaveInvoice);
    router.put("/invoice", validateToken, UpdateInvoice);
    router.get("/last-id", validateToken, GetLastID);
    app.use(router);
}
module.exports = invoice;