const User = require("../models/users.model");

/**
 * @desc create a new user
 * @route POST /user/create
 */
exports.create = (req, res) => {
	const data = req.body;
	if (!data.name || !data.address) {
		res.status(400).json({
			message: "Name and Address are required."
		})
		return;
	}
	const user = new User({
		name: req.body.name,
		address: req.body.address
	})
	User.create(user)
		.then(data => {
			return res.status(200).json({ ...data })
		})
		.catch(error => {
			return res.status(500).json({ error })
		})
}

/**
 * @desc find a user by id
 * @route GET /user/:userId
 */
exports.findOne = (req, res) => {
	const id = req.params.userId;
	if (!id) {
		res.status(400).json({ message: "Id is required." })
		return;
	}
	User.findById(id)
		.then(data => {
			return res.status(200).json({ data })
		})
		.catch(error => {
			if (error.type === "Not Found") {
				return res.status(404).json({
					message: `No user exists with id: ${id}`
				})
			}
			return res.status(500).json({ error })
		})
}

/**
 * @desc find all users
 * @route GET /user/
 */
exports.findAll = (req, res) => {
	User.findAll()
		.then(data => {
			res.status(200);
			if (data.length === 0) {
				return res.json({ data: "No Data Found" })
			}
			return res.json({ data });
		})
		.catch(err => {
			console.log(err);
			return res.status(500).json({ err });
		})
}

/**
 * @desc update an existing user data by user id
 * @route PUT /user/update/:userId
 */
exports.update = async (req, res) => {
	const userId = req.params.userId;
	const user = req.body;
	if (!userId || !user.name || !user.address) {
		return res.status(400).json({
			message: "Id, Name, Address are required for update operation."
		})
	}
	try {
		const oldUser = await User.findById(userId)
		const isUpdated = await User.updateById(user, userId)
		if (isUpdated.affectedRows === 1) {
			return res.status(200).json({
				message: "User updated successfully.",
				newValues: user,
				oldValues: oldUser
			})
		}
	} catch (error) {
		if (error.type === "Not Found") {
			return res.status(404).json({
				message: `Not user  exists with id ${userId}`
			})
		}
		return res.status(500).json({ error })
	}
}

/**
 * @desc delete an user by id
 * @route DELETE /user/delete/:userId
 */
exports.deleteOne = async (req, res) => {
	const userId = req.params.userId
	if (!userId) {
		return res.status(400).json({ message: "Id is required." })
	}
	try {
		const user = await User.findById(userId);
		const isDeleted = await User.remove(userId);
		if (isDeleted && user) {
			return res.status(200).json({
				message: "user deleted successfully.", ...user
			})
		}
	} catch (error) {
		if (error.type === "Not Found") {
			return res.status(404).json({
				message: `User doesn't exist with id ${userId}`
			})
		}
		return res.status(500).json({ err })
	}
}

/**
 * @desc delete all users
 * @route DELETE /user/deleteAll
 */
exports.deleteAll = (req, res) => {
	User.removeAll()
		.then( result => {
			console.log(result)
		})
		.catch( error => {
			return res.status(500).json({ error })
		})
}