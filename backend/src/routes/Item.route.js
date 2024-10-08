const express = require("express");
// const Authentication = require("../middlewares/Authentication");
const ItemController = require("../controllers/Item.controller");
const ItemValidation = require("../validations/Item.validation");
// const Validation = require("../middlewares/Validation");
const router = express.Router();

// Apply authentication to all routes
// router.use(Authentication);

// Get all items with optional pagination and search query
router.get("/get-all", ItemValidation.query_page, ItemController.getAllItems);
router.get("/get-all-archieveitems", ItemValidation.query_page, ItemController.getAllArchiveItems);


// Get a specific item by ID
router.get("/get/:id", ItemValidation.Params_id,ItemController.getItemById);

// Create a new item (RegisterItem)
router.post("/register", ItemValidation.RegisterItem, ItemController.RegisterItem);

// Update an item by ID
router.patch("/update/:id", ItemValidation.Params_id, ItemValidation.RegisterItem,ItemController.updateItem);

// Delete an item by ID
router.delete("/delete/:id", ItemValidation.Params_id,  ItemController.DeleteItem);

router.patch('/archive/:id', ItemValidation.Params_id, ItemController.archiveItem);







module.exports = router;
