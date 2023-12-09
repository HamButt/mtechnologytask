const User = require('../models/user')
const bcrypt = require('bcrypt');

exports.UserAuthentication = async (req,res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        const copmaringPass = await bcrypt.compare(password, existingUser.password)
        if(copmaringPass){
            res.cookie('user', existingUser._id, { httpOnly: true });
            res.status(200).json({ success: true, existingUser: existingUser });
        }
        else {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
    } catch (error) {
      res.status(400).json({ error: 'User Not Found' });
    }
};