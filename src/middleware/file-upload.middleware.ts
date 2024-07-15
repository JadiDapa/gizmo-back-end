import { Request, ParamsDictionary, Response, NextFunction } from 'express-serve-static-core';
import multer from 'multer';
import path from 'path';
import { ParsedQs } from 'qs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

export const uploadCheck = (
  req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  res: Response<any, Record<string, any>, number>,
  next: NextFunction
) => {
  if (!req.file && !req.files) {
    return next(); // No file to upload, skip to the next middleware
  }
  upload.single('file')(req, res, next); // 'file' should match the name attribute in your form
};

export default upload;
