// eslint-disable-next-line new-cap
const router = require("express").Router();
let Location = require("../../db/models/Location.model").Location;
const { messages, ResponseUtils, httpCodes } = require(__commons);
const responseUtils = new ResponseUtils();
// Get all locations
router.route("/").get((req, res) => {
	Location.find()
		.then((Location) =>
			responseUtils.setSuccess(httpCodes.OK, messages.SUCCESS_MESSAGE, Location))
		.catch((err) => responseUtils.setError(httpCodes.NOT_FOUND, err.message).send(res));
});

// Get specific Location
router.route("/:id").get((req, res) => {
	const id = req.params.id;
	Location.findById(id, (err, Location) => {
		if (err) responseUtils.setError(httpCodes.NOT_FOUND, err.message).send(res);
		responseUtils.setSuccess(httpCodes.OK, messages.SUCCESS_MESSAGE, Location);
	});
});

// Create new Location
router.route("/").post((req, res) => {
	const newLocation = new Location(req.body);
	newLocation
		.save()
		.then(() =>
			responseUtils.setSuccess(httpCodes.OK, messages.ADDED_SUCCESSFULLY, newLocation))
		.catch((err) => responseUtils.setError(httpCodes.DB_ERROR, err.message).send(res));
});

// Update a specific Location
router.route("/:id").put(async (req, res) => {
	const id = req.params.id;
	try {
		let updatedLocation = await Location.findByIdAndUpdate(id, req.body, {
			"new": true,
			useFindAndModify: false,
		});
		responseUtils.setSuccess(httpCodes.OK, messages.UPDATED_SUCCESSFULLY, updatedLocation)
	} catch (err) {
		responseUtils.setError(httpCodes.DB_ERROR, err.message).send(res);
	}
});

// Delete a Location
router.route("/:id").delete(async (req, res) => {
	const id = req.params.id;
	try {
		const deletedLocation = await Location.findByIdAndDelete(id);
		responseUtils.setSuccess(httpCodes.OK, messages.DELETED_SUCCESSFULLY, deletedLocation)
	} catch (err) {
		responseUtils.setError(httpCodes.DB_ERROR, err.message).send(res);
	}
});

module.exports = router;
