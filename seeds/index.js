const mongoose = require("mongoose");
const cities = require("./cities.js");
const { places, descriptors } = require("./seedHelpers.js");
const campground = require("../models/campground.js");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
	console.log("database connection");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await campground.deleteMany({});
	for (let i = 0; i < 300; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 30) + 10;

		const camp = new campground({
			author: "6348045aec457099e89b43c6",
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo impedit magnam debitis laborum beatae, aliquid quis. Cumque assumenda enim saepe omnis. Minima qui adipisci perferendis! Et quam facere voluptatum perspiciatis!",
			price,
			geometry: {
				type: "Point",
				coordinates: [
					cities[random1000].longitude,
					cities[random1000].latitude,
				],
			},
			images: [
				{
					url: "https://res.cloudinary.com/djnmofntk/image/upload/v1665744438/YelpCamp/w8dbg0xppzcam5lksxwf.jpg",
					filename: "YelpCamp/w8dbg0xppzcam5lksxwf",
				},
				{
					url: "https://res.cloudinary.com/djnmofntk/image/upload/v1665744444/YelpCamp/lxb4paudasj2w4vtzhms.jpg",
					filename: "YelpCamp/lxb4paudasj2w4vtzhms",
				},
			],
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
	console.log("connection closed");
});
