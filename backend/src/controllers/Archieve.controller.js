const httpStatus = require("http-status");
const CatchAsync = require("../utils/CatchAsync");
const ArchiveService = require("../services/Archive.service");

class ArchiveController {

    // Register a new archived item
    static RegisterArchivedItem = CatchAsync(async (req, res) => {
        const res_obj = await ArchiveService.RegisterArchivedItem(req.body);
        return res.status(httpStatus.CREATED).json(res_obj);
    });

    // Update an archived item by ID
    static updateArchivedItem = CatchAsync(async (req, res) => {
        const res_obj = await ArchiveService.updateArchivedItem(req.params.id, req.body);
        return res.status(httpStatus.OK).json(res_obj);
    });

    // Get All Archived Items
    static getAllArchivedItems = CatchAsync(async (req, res) => {
        const res_obj = await ArchiveService.getAllArchivedItems(req.query.page, req.query.query);
        return res.status(httpStatus.OK).json(res_obj);
    });

    static archiveItem = CatchAsync(async (req, res) => {
        const _id = req.params.id; // Extract item ID from the URL
        const { quantity: archiveQuantity } = req.body; // Extract archive quantity from the request body

        const res_obj = await ArchiveService.archiveItem(_id, archiveQuantity);
        return res.status(httpStatus.OK).json(res_obj);
    });
}

module.exports = ArchiveController;
