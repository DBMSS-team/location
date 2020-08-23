const router = require('express').Router();
let Location = require('../../db/models/Location.model').Location;

// Get all products
router.route('/').get((req, res) => {
	Location.find()
		.then((Location) => res.json(Location))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Get specific Location
router.route('/:id').get((req, res) => {
	const id = req.params.id;
	Location.findById(id, (err, Location) => {
		if (err) res.status(400).json('Error: ' + err);
		res.json(Location);
	});
});

// Create new Location
router.route('/').post((req, res) => {
	const newLocation = new Location(req.body);
	newLocation
		.save()
		.then(() => res.json('Location added.'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Update a specific Location
router.route('/:id').put(async (req, res) => {
	const id = req.params.id;
	try {
		let updatedLocation = await Location.findByIdAndUpdate(id, req.body, {
			new: true,
			useFindAndModify: false,
		});
		res.json(updatedLocation);
	} catch (err) {
		res.status(400).json('Error: ' + err);
	}
});

// Delete a Location
router.route('/:id').delete(async (req, res) => {
	const id = req.params.id;
	try {
		const deletedLocation = await Location.findByIdAndDelete(id);
		res.json(deletedLocation);
	} catch (err) {
		res.status(400).json('Error: ' + err);
	}
});

module.exports = router;
