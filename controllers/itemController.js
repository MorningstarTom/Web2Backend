const Item = require('../models/itemModel');

exports.createItem = async (req, res) => {
    try {
        const itemData = { ...req.body };

        // If user is authenticated, attach their ID as seller
        if (req.user) {
        itemData.seller = req.user.id;
        }

        const item = await Item.create(itemData);
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ msg: 'Create error', err });
    }
};


exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ msg: 'Fetch error', err });
    }
};

exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.json(item);
    } catch (err) {
        res.status(404).json({ msg: 'Item not found' });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ msg: 'Update error', err });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Delete error', err });
    }
};
