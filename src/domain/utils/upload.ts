import multer from "multer";
import path from "path";
import fs from "fs";

// Répertoire de stockage des fichiers uploadés
const uploadDirectory = path.join(__dirname, "../../uploads");

// Créer le répertoire s'il n'existe pas
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configuration de Multer pour le stockage des fichiers
export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDirectory); // Répertoire de destination
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${uniqueSuffix}-${file.originalname}`;
      cb(null, filename); // Nom unique pour éviter les conflits
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/avi",
      "video/mkv",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Seuls les fichiers JPEG, PNG, et GIF et certains formats vidéos sont autorisés."));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // Taille maximale : 5 Mo
  },
});
