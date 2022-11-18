const product = (app) => {
    const router = require("express").Router();
    const upload = require("../controller/upload.controller")
    const validateToken = require("../auth/validateToken.controller");
    const { SaveProduct, GetProduct, GetAutoID, TotalRecord, UpdateClick, GetProductbyCate, UpdateProduct, DiscountProduct, PopularProduct, SearchProductByID, SearchProductByName } = require("../controller/product.controller")
    router.post("/product", validateToken, upload.single("image"), SaveProduct);
    router.get("/product/:s/:e", validateToken, GetProduct);
    router.put("/product", validateToken, upload.single("image"), UpdateProduct);
    router.get("/product-get-auto-id", validateToken, GetAutoID);
    router.get("/product-total", validateToken, TotalRecord);
    router.get("/product-search-name/:name", validateToken, SearchProductByName);
    router.get("/product-search-id", validateToken, SearchProductByID);
    router.get("/product-top/:s/:e", validateToken, PopularProduct);
    router.get("/product-top-dis/:s/:e", validateToken, DiscountProduct);
    router.get("/product-update-view/:id", validateToken, UpdateClick);
    router.get("/product-by-cate/:id/:cate_start/:cate_end", validateToken, GetProductbyCate);
    app.use(router)
}
module.exports = product