import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDbData } from '../db.js';

export const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const inputEmail = (email || username || '').trim().toLowerCase();

    if (!inputEmail || !password) {
      return res.status(400).json({ error: 'Email/username and password are required.' });
    }

    const dbData = getDbData();
    const adminEmail = (dbData.admin.email || process.env.ADMIN_EMAIL || 'sourabhsheoran695@gmail.com').toLowerCase();

    if (inputEmail !== adminEmail) {
      return res.status(401).json({ error: 'Invalid admin credentials.' });
    }

    const isMatch = await bcrypt.compare(password, dbData.admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid admin credentials.' });
    }

    const secret = process.env.JWT_SECRET || 'sourabh_portfolio_jwt_secret_key_2026';
    const token = jwt.sign(
      { email: adminEmail, role: 'admin' },
      secret,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      admin: { email: adminEmail }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error during login.' });
  }
};

export const verifySession = (req, res) => {
  return res.status(200).json({
    valid: true,
    user: req.user
  });
};
