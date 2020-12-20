const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const { registerValidation } = require('../validation');

router.post('/register', async (req, res) => {
    // Validation the data
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const saveUser = await user.save();
        res.send(saveUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;