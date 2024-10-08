const httpStatus = require("http-status");
const ArchivedItemModel = require("../models/Archiveproduct.models"); 
const ItemsModel = require("../models")// Assuming you have the correct path for the model
const ApiError = require("../utils/ApiError");

class ArchiveService {

    // Add a new archived item
    static async RegisterArchivedItem(body) {
        const { name, price, quantity, supplier_name } = body;

        const checkExist = await ArchivedItemModel.findOne({ name });

        if (checkExist) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Archived Item Already Exists");
            return;
        }

        await ArchivedItemModel.create({
            name, price, quantity, supplier_name
        });

        return {
            msg: "Archived Item Added :)"
        };
    }

    // Get all archived items with optional pagination and search query
    static async getAllArchivedItems(page = 1, query = '') {
        const limit = 10;
        const skip = (Number(page) - 1) * limit;

        const queryies = {
            $or: [
                { name: new RegExp(query) },
                { supplier_name: new RegExp(query) }
            ]
        };

        const data = await ArchivedItemModel.find(queryies)
            .select("name price quantity supplier_name")
            .skip(skip)
            .limit(limit);

        // total documents
        const totalArchivedItems = await ArchivedItemModel.countDocuments(queryies);

        // has more
        const hasMore = skip + limit < totalArchivedItems;

        return {
            archivedItems: data,
            more: hasMore
        };
    }

    // Update an archived item by ID
    static async updateArchivedItem(id, body) {
        const { name, price, quantity, supplier_name } = body;

        const checkExist = await ArchivedItemModel.findOne({ _id: id });

        if (!checkExist) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Archived Item Not Found");
            return;
        }

        await ArchivedItemModel.findByIdAndUpdate(id, {
            name, price, quantity, supplier_name
        });

        return {
            msg: "Archived Item Updated :)"
        };
    }

    static async archiveItem(_id, archiveQuantity) {
        // Find the item by ID in the Items collection
        const item = await ItemsModel.findById(_id);

        if (!item) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Item not found');
        }

        // Check if archive quantity exceeds available quantity
        if (archiveQuantity > item.quantity) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Archive quantity exceeds available quantity');
        }

        // Check if the item already exists in the archived collection
        let archivedItem = await ArchivedItemModel.findOne({ name: item.name });

        // Full archive: If the quantity to archive matches the item's total quantity
        if (archiveQuantity === item.quantity) {
            if (archivedItem) {
                // If already archived, update the quantity
                archivedItem.quantity += archiveQuantity;
                await archivedItem.save();
            } else {
                // Otherwise, create a new archived item
                await ArchivedItemModel.create({
                    name: item.name,
                    price: item.price,
                    quantity: archiveQuantity,
                    supplier_name: item.supplier_name,
                    archivedAt: new Date(),
                });
            }

            // Delete the item from the active collection
            await ItemsModel.findByIdAndDelete(_id);

            return {
                msg: 'Item fully archived and removed from active collection',
            };
        }

        // Partial archive: Reduce the quantity of the active item
        item.quantity -= archiveQuantity;
        await item.save();

        // If the archived item already exists, update its quantity
        if (archivedItem) {
            archivedItem.quantity += archiveQuantity;
            await archivedItem.save();
        } else {
            // Otherwise, create a new archived item
            await ArchivedItemModel.create({
                name: item.name,
                price: item.price,
                quantity: archiveQuantity,
                supplier_name: item.supplier_name,
                archivedAt: new Date(),
            });
        }

        return {
            msg: 'Item partially archived successfully',
            remainingQuantity: item.quantity,
        };
    }
}


module.exports = ArchiveService;
