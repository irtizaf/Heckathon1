export const BASE_PATH =
	process.env.NODE_ENV == "development"
		? "http://localhost:3000"
		: "https://heckathon1.vercel.app/";