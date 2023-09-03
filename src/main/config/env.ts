export default {
	port: process.env.PORT || 5050,
	bcryptSalt: 12,
	jwtSecret:
		process.env.JWT_SECRET ||
		"*9x9$^7%qRd~TkFHW-Ax@2078*/-6+56fdsSFG$KAScs~^fsdf56s1+fe1$FV",
};
