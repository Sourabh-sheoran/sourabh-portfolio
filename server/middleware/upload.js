import multer from 'multer';
import path from 'path';
import fs from 'fs';

const isVercel = !!process.env.VERCEL;
const localUploadDir = path.join(process.cwd(), 'public', 'uploads');
const tmpUploadDir = path.join('/tmp', 'uploads');

const getUploadDir = () => {
  const dir = isVercel ? tmpUploadDir : localUploadDir;
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (e) {
    console.warn('Could not create upload directory:', e.message);
  }
  return dir;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, getUploadDir());
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  const allowedPdfTypes = ['application/pdf'];

  if (file.fieldname === 'profilePic') {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type for profile picture. Only JPG, PNG, and WEBP are allowed.'), false);
    }
  } else if (file.fieldname === 'resume') {
    if (allowedPdfTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type for resume. Only PDF files are allowed.'), false);
    }
  } else if (file.fieldname === 'projectImage') {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type for project image. Only JPG, PNG, and WEBP are allowed.'), false);
    }
  } else {
    cb(new Error('Unexpected upload field.'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB max size limit
  }
});
