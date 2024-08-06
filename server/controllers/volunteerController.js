const Volunteer = require('../models/volunteer');

exports.createVolunteer = async (req, res) => {
    try {
        const newVolunteer = new Volunteer(req.body);
        await newVolunteer.save();
        res.status(201).json({ message: 'Thanks for volunteering, form submitted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
