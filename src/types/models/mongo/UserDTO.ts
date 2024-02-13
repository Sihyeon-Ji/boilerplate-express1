// type Status = "OK" | "Bad Request" | "Unauthorized";
// export interface UserRequestDTO {
// 	message: string;
// 	status?: Status;
// }

export interface UserDTO {
	email: string;
	username: string;
	authentication: {
		password: string;
		salt: string;
		sessionToken: string;
	};
}
