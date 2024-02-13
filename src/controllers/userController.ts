import express from "express";
import { deleteUserById, getUsers, getUserById } from "models/mongo/users";

//SECTION - userController
/**
 * 유저 관련 컨트롤러
 * @author Sean <shji@dtol.co.kr>
 */

export const getAllUsers = async (
	req: express.Request,
	res: express.Response,
) => {
	try {
		const users = await getUsers();

		return res.status(200).json(users);
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const deleteUser = async (
	req: express.Request,
	res: express.Response,
) => {
	try {
		const { id } = req.params;

		const deletedUser = await deleteUserById(id);

		return res.json(deletedUser);
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const updateUser = async (
	req: express.Request,
	res: express.Response,
) => {
	try {
		const { id } = req.params;
		const { username } = req.body;

		if (!username) {
			return res.sendStatus(400);
		}

		const user = await getUserById(id);

		if (user) {
			user.username = username;
			await user.save();
			return res.status(200).json(user).end();
		}
		return res.sendStatus(400);
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

//!SECTION
