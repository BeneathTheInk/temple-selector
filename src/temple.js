try {
	module.exports = require("templejs");
} catch(e) {
	module.exports = global.Temple;
}

if (module.exports == null) {
	throw new Error("Could not locate Temple.");
}