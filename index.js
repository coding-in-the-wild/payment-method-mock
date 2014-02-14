
function UUIDv4() {
	return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
		return v.toString(16)
	})
}

module.exports = function Mock() {

	function charge(description, amount, obj, cb) {
		process.nextTick(function() {
			cb(null, true, UUIDv4())
		})
	}

	return {
		id: 'mock',
		charge: charge
	}
}
