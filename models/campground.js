const mongoose = require("mongoose");
const Review = require("./review");
const user = require("./user");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
	url: String,
	filename: String,
});

imageSchema.virtual("thumbnail").get(function () {
	return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };

const campgroundSchema = new Schema(
	{
		title: String,
		geometry: {
			type: {
				type: String,
				enum: ["Point"],
				required: true,
			},
			coordinates: {
				type: [Number],
				required: true,
			},
		},
		images: [imageSchema],
		price: Number,
		description: String,
		location: String,
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		reviews: [
			{
				type: Schema.Types.ObjectId,
				ref: "Review",
			},
		],
	},
	opts
);

//update the popup when clicking on the map on index
campgroundSchema.virtual("properties.popUpMarkup").get(function () {
	return `<h3><a class="link-success" href="/campgrounds/${
		this._id
	}">${this.title}</a></h3>
	<p class="text-muted"><i>${this.location}</i></p>
	<p>${this.description.substring(
		0,
		50
	)}...</p> <a class="btn btn-success btn-sm">View</a>`;
});

campgroundSchema.post("findOneAndDelete", async function (doc) {
	if (doc) {
		await Review.deleteMany({
			_id: {
				$in: doc.reviews,
			},
		});
	}
});

module.exports = mongoose.model("Campground", campgroundSchema);
