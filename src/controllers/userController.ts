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
	const users = await getUsers();

	return res.status(200).json(users);
};

export const deleteUser = async (
	req: express.Request,
	res: express.Response,
) => {
	const { id } = req.params;

	const deletedUser = await deleteUserById(id);

	return res.json(deletedUser);
};

export const updateUser = async (
	req: express.Request,
	res: express.Response,
) => {
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
};

//!SECTION
