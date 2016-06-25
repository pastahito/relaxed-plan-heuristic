var test = require('tape');
var heuristic = require('../lib/index')
var setup = require('./setup')

test('heuristic(problem): Satisfying', (t) => {
	fixtures = setup()
	h = heuristic(fixtures)
	console.log(h);
	t.pass("Just verifying the output")
	t.end()
})
