const verifyToken = (req, res, next) => {
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {
		try {
			const bearer = bearerHeader.replace(/^JWT\s/, ``).split(" ");
			const bearerToken = bearer[1].replace(/^"(.*)"$/, "$1");
			req.token = bearerToken;
			next();
		} catch(error) {
			res.status(400).json({isOpSuccess: false, message: "Check token format"});
		}
	} else {
		res.status(400).json({isOpSuccess: false, message: "Invalid token"});
	}
}

exports.verifyToken = verifyToken;