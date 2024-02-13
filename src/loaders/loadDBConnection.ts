import mongoose from "mongoose";

/** mongoDB connection */
export const loadDBConnection = () => {
	const MONGO_URL = process.env.API_MONGO_URL; // DB URI
	mongoose.Promise = Promise; // global javascript Promise
	mongoose.connect(MONGO_URL as string); // mongoDB connection url
	mongoose.connection.on("error", (error: Error) => console.log(error)); // error catcher
};
