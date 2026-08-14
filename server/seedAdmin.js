import bcrypt from 'bcryptjs';
import { getDbData, saveDbData } from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const seed = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'sourabhsheoran695@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  console.log(`Seeding Admin Account...`);
  console.log(`Email: ${adminEmail}`);

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(adminPassword, salt);

  const dbData = getDbData();
  dbData.admin = {
    email: adminEmail,
    passwordHash: passwordHash
  };

  saveDbData(dbData);

  console.log('✅ Admin credentials successfully seeded!');
  console.log(`You can now log in at /admin/login using Email: ${adminEmail} and Password: ${adminPassword}`);
};

seed();
