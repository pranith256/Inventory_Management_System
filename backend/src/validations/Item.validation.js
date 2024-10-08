const { body, param, query } = require("express-validator");

class ItemValidation {

    static RegisterItem = [
        body("name").notEmpty().withMessage("Name cannot be empty"),
        body("price").isNumeric().withMessage("Price must be a valid number").notEmpty().withMessage("Price cannot be empty"),
        body("quantity").isNumeric().withMessage("Quantity must be a valid number").notEmpty().withMessage("Quantity cannot be empty"),
        body("supplier_name").optional().isString().withMessage("Supplier name must be a string")
    ];

    static Params_id = [
        param("id").isMongoId().withMessage("Provide a valid ID").notEmpty().withMessage("ID is required")
    ];

    static query_page = [
        query("page").optional().isNumeric().withMessage("Page must be a number"),
        query("query").optional().isString().withMessage("Query must be a string")
    ];
}

module.exports = ItemValidation;
