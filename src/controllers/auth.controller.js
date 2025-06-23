// const { User } = require('../models');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const hash = await bcrypt.hash(password, 10);

//     const user = await User.create({ name, email, password: hash });
//     res.status(201).json({ message: 'User created', userId: user.id });
//   } catch (err) {
//     res.status(500).json({ error: 'Signup failed' });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email } });
//     if (!user) return res.status(401).json({ error: 'User not found' });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(401).json({ error: 'Invalid password' });

//     const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
//       expiresIn: '1h'
//     });

//     res.json({ message: 'Login successful', token });
//   } catch (err) {
//     res.status(500).json({ error: 'Login failed' });
//   }
// };

// module.exports = { signup, login };


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
