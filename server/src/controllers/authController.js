const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../src/models/User');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, hashedPassword);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

module.exports = { register, login, logout };
