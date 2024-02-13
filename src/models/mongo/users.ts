import mongoose from "mongoose";
import { UserDTO } from "types/models/mongo/UserDTO";

// User Schema
const UserSchema = new mongoose.Schema<UserDTO>({
	email: { type: String, required: true },
	username: { type: String, required: true },
	authentication: {
		password: { type: String, required: true, select: false }, // select : user를 patch할 때, 실수로 authentication 객체를 patch하지 않도록 하기 위한 키 값
		salt: { type: String, select: false },
		sessionToken: { type: String, select: false },
	},
});

// User Schema -> User Model
export const UserModel = mongoose.model<UserDTO>("User", UserSchema);

// User Actions
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
	UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findById(id); // id는 findOne 사용하지 않고 findById 사용하면 됨
export const createUser = (values: Record<string, any>) =>
	new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
	UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
	UserModel.findByIdAndUpdate(id, values);
