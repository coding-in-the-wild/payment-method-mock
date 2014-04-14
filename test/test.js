var test = require('tap').test
var Mock = require('payment-method-mock')

test('id is a string and correct', function(t) {
	var mock = new Mock()

	t.equal(typeof mock.id, 'string')
	t.equal(mock.id, 'mock')

	t.end()
})

test('The charge function is a reasonable facsimile of a real charge function', function(t) {
	var mock = new Mock()

	t.plan(4)

	t.equal(typeof mock.charge, 'function', 'has a charge function')

	mock.charge("This is a test", 13.13, { nothing: 'whatever' }, function callback(err, success, id) {
		t.notOk(err, 'no error given to callback')
		t.ok(success, 'transaction was successful')
		t.equal(typeof id, 'string', 'id is a string')

		t.end()
	})
})

test("A different id comes back for multiple calls", function(t) {
	var mock = new Mock()

	t.plan(5)

	var ids = {}

	function callback(err, success, id) {
		t.equal(typeof ids[id], 'undefined', 'The id does not exist on the object yet')
		ids[id] = true
	}

	mock.charge("This is a test", 13.13, { nothing: 'whatever' }, callback)
	mock.charge("This is a test", 13.13, { nothing: 'whatever' }, callback)
	mock.charge("This is a test", 13.13, { nothing: 'whatever' }, callback)
	mock.charge("This is a test", 13.13, { nothing: 'whatever' }, callback)
	mock.charge("This is a test", 13.13, { nothing: 'whatever' }, callback)
})

