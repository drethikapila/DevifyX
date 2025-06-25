const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup controller
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }
    if (typeof password !== 'string') {
    return res.status(400).json({ error: "Password must be a string" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User created', userId: newUser.id });
  } catch (error) {
    console.error(error); // ✅ ONLY log `error`
    res.status(500).json({ error: 'Signup failed' });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error); // ✅ ONLY log `error`
    res.status(500).json({ error: 'Login failed' });
  }
};
