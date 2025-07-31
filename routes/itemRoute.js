const express = require('express');
const router = express.Router();
const {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
} = require('../controllers/itemController');

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem)

module.exports = router;
