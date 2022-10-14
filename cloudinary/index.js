const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const express = require("express");
const multer = require("multer");
const app = express();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "YelpCamp",
		allowedFormats: ["png", "jpg", "jpeg"],
	},
});

const parser = multer({ storage: storage });

// const storage = CloudinaryStorage({
// 	cloudinary,
// 	folder: "YelpCamp",
// });

module.exports = {
	cloudinary,
	storage,
};
