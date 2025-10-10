const Ground = require('../models/groundmodel');

exports.createGround = async (req, res) => {
    try {
        const { name, location, type, charges, slots, description, image } = req.body;
        const provider_id = req.user.user_id;

        if (req.user.role !== 'provider') {
            return res.status(403).json({ message: 'Only providers can create grounds' });
        }

        const ground = new Ground({
            provider_id,
            name,
            location,
            type,
            image,
            charges,
            slots,
            description
        });

        await ground.save();
        res.status(201).json({ message: 'Ground created successfully', ground });
    } catch (error) {
        console.error('Error creating ground:', error);
        res.status(500).json({ error: 'Failed to create ground' });
    }
};

exports.getAllGrounds = async (req, res) => {
    try {
        const grounds = await Ground.find();
        res.status(200).json(grounds);
    } catch (error) {
        console.error('Error fetching grounds:', error);
        res.status(500).json({ error: 'Failed to fetch grounds' });
    }
};

exports.getGroundsByProvider = async (req, res) => {
    try {
        const { provider_id } = req.params;
        const grounds = await Ground.find({ provider_id });
        if (grounds.length === 0) {
            return res.status(404).json({ error: 'No grounds found for this provider' });
        }
        res.status(200).json(grounds);
    } catch (error) {
        console.error('Error fetching grounds by provider ID:', error);
        res.status(500).json({ error: 'Failed to fetch grounds' });
    }
};

exports.getGroundsByLocation = async (req, res) => {
    try {
        const { location, type } = req.query;
        const query = { location };
        if (type) query.type = type;

        const grounds = await Ground.find(query);
        res.status(200).json(grounds);
    } catch (error) {
        console.error('Error fetching grounds:', error);
        res.status(500).json({ error: 'Failed to fetch grounds' });
    }
};

exports.getGroundById = async (req, res) => {
    try {
        const ground = await Ground.findById(req.params.id);
        if (!ground) {
            return res.status(404).json({ error: 'Ground not found' });
        }
        res.status(200).json(ground);
    } catch (error) {
        console.error('Error fetching ground by ID:', error);
        res.status(500).json({ error: 'Failed to fetch ground' });
    }
};


exports.deleteGround = async (req, res) => {
    try {
        const ground = await Ground.findByIdAndDelete(req.params.id);
        if (!ground) {
            return res.status(404).json({ error: 'Ground not found' });
        }
        res.status(200).json({ message: 'Ground deleted successfully' });
    } catch (error) {
        console.error('Error deleting ground:', error);
        res.status(500).json({ error: 'Failed to delete ground' });
    }
};
