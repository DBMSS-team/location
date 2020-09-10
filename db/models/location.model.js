const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const locationSchema = new Schema(
	{
		latitude: { type: String, required: true },
		longitude: { type: String, required: true },
		place: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Location = mongoose.model("Location", locationSchema);

module.exports = { Location, locationSchema };
