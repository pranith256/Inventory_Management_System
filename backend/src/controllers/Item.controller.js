const httpStatus = require("http-status"); 
const CatchAsync = require("../utils/CatchAsync");
const ItemService = require("../services/Item.service");

class ItemController {

    // Create a new Item
    static RegisterItem = CatchAsync(async (req, res) => {
        const res_obj = await ItemService.RegisterItem(req.body);
        return res.status(httpStatus.CREATED).json(res_obj);
    });

    // Update an Item by ID
    static updateItem = CatchAsync(async (req, res) => {
        const res_obj = await ItemService.updateItem(req.params.id, req.body);
        return res.status(httpStatus.OK).json(res_obj);
    });

    // Get Item by ID
    static getItemById = CatchAsync(async (req, res) => {
        const res_obj = await ItemService.getItemById(req.params.id);
        return res.status(httpStatus.OK).json(res_obj);
    });

    // Get All Items
    static getAllItems = CatchAsync(async (req, res) => {
        const res_obj = await ItemService.getAllItems(req.query.page, req.query.query);
        return res.status(httpStatus.OK).json(res_obj);
    });

    static getAllArchiveItems = CatchAsync(async (req, res) => {
        const res_obj = await ItemService.getAllArchiveItems(req.query.page, req.query.query);
        return res.status(httpStatus.OK).json(res_obj);
    });

    // Delete Item by ID
    static DeleteItem = CatchAsync(async (req, res) => {
        const res_obj = await ItemService.DeleteItem(req.params.id);
        return res.status(httpStatus.OK).json(res_obj);
    });

    static archiveItem = CatchAsync(async (req, res) => {
        const _id = req.params.id; // Extract item ID from the URL
        const { quantity: archiveQuantity } = req.body; // Extract updated quantity from the body
        
        // Call the service to process the archive
        const res_obj = await ItemService.archiveItem(_id, archiveQuantity);

        return res.status(httpStatus.OK).json(res_obj);
    });

    // static archiveItem = CatchAsync(async (req, res) => {
    //     const _id = req.params.id; // Get the item ID from the route params
    //     const { quantity: archiveQuantity } = req.body; // Get the quantity to archive from the request body
        
    //     // Call the service to perform the archive action
    //     const res_obj = await ItemService.archiveItem(_id, archiveQuantity);
    //     return res.status(httpStatus.OK).json(res_obj); // Respond with the result
    // });



}

module.exports = ItemController;
