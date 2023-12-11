export type Params = {
	email: string;
	phone: string;
	password: string;
};

type Register = {
	type: "REGISTER";
	params: Params;
};

type Login = {
	type: "LOGIN";
	params: Pick<Params, "phone">;
};

type LogOut = {
	type: "LOGOUT";
};

export type Auth = Register | Login | LogOut;
