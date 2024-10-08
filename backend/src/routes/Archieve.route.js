const express = require("express");
const ArchiveController = require("../controllers/Archieve.controller");
const ArchiveValidation = require("../validations/Item.validation");
const router = express.Router();

// Get all archived items with optional pagination and search query
router.get("/get-all", ArchiveValidation.query_page, ArchiveController.getAllArchivedItems);

// Create a new archived item (RegisterArchivedItem)
// router.post("/register", ArchiveValidation.RegisterArchivedItem, ArchiveController.RegisterArchivedItem);

// Update an archived item by ID
// router.patch("/update/:id", ArchiveValidation.Params_id, ArchiveValidation.RegisterArchivedItem, ArchiveController.updateArchivedItem);
router.patch("/put/:id", ArchiveValidation.Params_id, ArchiveController.archiveItem);

module.exports = router;
