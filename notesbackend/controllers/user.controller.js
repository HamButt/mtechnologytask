const User = require('../models/user')
const bcrypt = require('bcrypt');


exports.userSignup = async (req,res) => {
    const { email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'Email is already registered' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save(); 
      res.status(200).json({ success: true, user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'User already register' });
    }
};