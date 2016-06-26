var test = require('tape');
var heuristic = require('../lib/index')
var setup = require('./setup')

test('heuristic(problem): Satisfying', (t) => {
	fixtures = setup()

	f = {}

	f.initialState = {'p1(O)' : 1 }

	f.goalState = { 'p4(O)' : 1,'p5(O)' : 1 }

	f.preconditions = {
		'op1' : { 'p6(O)' : 1 },
		'op2' : { 'p3(O)' : 1 },
		'op3' : { 'p3(O)' : 1 },
		'op4' : { 'p2(O)' : 1 },
		'op5' : { 'p1(O)' : 1 },
		'op6' : { 'p3(O)' : 1 }
	}

	f.postconditions = {
		'op1' : { 'p6(O)' : 0, 'p2(O)' : 1 },
		'op2' : { 'p4(O)' : 0, 'p5(O)' : 1 },
		'op3' : { 'p3(O)' : 0, 'p2(O)' : 1 },
		'op4' : { 'p2(O)' : 0, 'p5(O)' : 0, 'p4(O)' : 1 },
		'op5' : { 'p3(O)' : 1 },
		'op6' : { 'p1(O)' : 0, 'p5(O)' : 1 }
	}

	f.costs = { 'op1' : 1, 'op2' : 1, 'op3' : 1, 'op4' : 1, 'op5' : 1, 'op6' : 1 }

	h = heuristic(f)
	console.log(h);
	t.pass("Just verifying the output")
	t.end()
})
