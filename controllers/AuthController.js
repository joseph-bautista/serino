const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../auth');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const token = generateToken(user);
  
      res.status(200).json({ message: 'Login successful', data: {token: token, name:user.name }});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
};

exports.register = async (req, res) => {
  try {
    const { name, email, age, password } = req.body;

    const user = await User.create({
      name,
      email,
      age,
      password
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
};
