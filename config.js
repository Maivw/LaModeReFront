// const production = process.env.NODE_ENV === "production";
// const baseUrl = production
// 	? "https://lamodebackend2.herokuapp.com/"
// 	: process.env.REACT_APP_API_BASE_URL;

// module.exports = {
// 	baseUrl: baseUrl,
// 	cloudinaryUrl: process.env.REACT_APP_CLOUDINARY_URL,
// 	cloudinaryPreset: process.env.
// };

module.exports = {
	baseUrl:
		process.env.NODE_ENV == "development"
			? process.env.REACT_APP_API_BASE_URL
			: "https://lamodebackend2.herokuapp.com/",
	cloudinaryUrl: process.env.REACT_APP_CLOUDINARY_URL,
};
