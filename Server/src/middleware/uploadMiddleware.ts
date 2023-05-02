import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uplodedData/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}-${file.originalname.replace(" ", "")}`);
  },
});

const uploadMiddleware = multer({
  limits: {
    fileSize: 1024 * 1024 * 300,
  },
  storage,
});

export default uploadMiddleware;
