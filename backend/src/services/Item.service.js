const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { ItemsModel, ArchiveItemModel } = require("../models")

class ItemService {

    // Register a new item
    static async RegisterItem(body) {
        const { name, price, quantity, supplier_name } = body;

        const checkExist = await ItemsModel.findOne({ name });

        if (checkExist) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Item Already Exists");
            return;
        }

        await ItemsModel.create({
            name, price, quantity, supplier_name
        });

        return {
            msg: "Item Added :)"
        };
    }

    // Delete an item by ID
    static async DeleteItem(id) {
        const checkExist = await ItemsModel.findOneAndDelete({ _id: id });

        if (!checkExist) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Item Not Found in Record");
            return;
        }

        return {
            msg: "Item Deleted :)"
        };
    }

    // Get item by ID
    static async getItemById(id) {
        const item = await ItemsModel.findOne({ _id: id });

        if (!item) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Item Not Found in Record");
            return;
        }

        return {
            item
        };
    }

    static async getAllItems(page = 1, query = '') {
        const limit = 10;
        const skip = (Number(page) - 1) * limit;

        const queryies = {
            $or: [
                { name: new RegExp(query) },
                { supplier_name: new RegExp(query) }
            ]
        };

        const data = await ItemsModel.find(queryies)
            .select("name price quantity supplier_name")
            .skip(skip)
            .limit(limit);

        // total documents
        const totalItems = await ItemsModel.countDocuments(queryies);

        // has more
        const hasMore = skip + limit < totalItems;

        return {
            items: data,
            more: hasMore
        };
    }

    static async getAllArchiveItems(page = 1, query = '') {
        const limit = 10;
        const skip = (Number(page) - 1) * limit;

        const queryies = {
            $or: [
                { name: new RegExp(query) },
                { supplier_name: new RegExp(query) }
            ]
        };

        const data = await ArchiveItemModel.find(queryies)
            .select("name price quantity supplier_name")
            .skip(skip)
            .limit(limit);

        // total documents
        const totalItems = await ItemsModel.countDocuments(queryies);

        // has more
        const hasMore = skip + limit < totalItems;

        return {
            items: data,
            more: hasMore
        };
    }

    // Update an item by ID
    static async updateItem(id,body) {
        const { name, price, quantity, supplier_name } = body;

        const checkExist = await ItemsModel.findOne({ _id: id });

        if (!checkExist) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Item Not Found");
            return;
        }

        await ItemsModel.findByIdAndUpdate(id, {
            name, price, quantity, supplier_name
        });

        return {
            msg: "Item Updated :)"
        };
    }

    static async archiveItem(id, archiveQuantity) {
        const item = await ItemsModel.findById(id);

        if (!item) {
            throw new ApiError(httpStatus.NOT_FOUND, "Item not found");
        }

        if (archiveQuantity > item.quantity) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Archive quantity exceeds available quantity");
        }

        let archivedItem = await ArchiveItemModel.findOne({ name: item.name });

        if (archiveQuantity === item.quantity) {
            if (archivedItem) {
                archivedItem.quantity += archiveQuantity;
                await archivedItem.save();
            } else {
                await ArchiveItemModel.create({
                    name: item.name,
                    price: item.price,
                    quantity: archiveQuantity,
                    supplier_name: item.supplier_name,
                });
            }

            await ItemsModel.findByIdAndDelete(id); // Remove the item from active collection

            return {
                msg: "Item fully archived and Deleted from the Inventory",
            };
        }

        item.quantity -= archiveQuantity;
        await item.save();

        if (archivedItem) {
            archivedItem.quantity += archiveQuantity;
            await archivedItem.save();
        } else {
            await ArchiveItemModel.create({
                name: item.name,
                price: item.price,
                quantity: archiveQuantity,
                supplier_name: item.supplier_name,
            });
        }

        return {
            msg: "Item quantity archived successfully",
            remainingQuantity: item.quantity,
        };
    }
    
   

}

module.exports = ItemService;
