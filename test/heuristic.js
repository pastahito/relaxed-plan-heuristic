var test = require('tape');
var relaxed_plan_based = require('../lib/index')
var fixtures = require('./fixtures')

test('relaxed_plan_based(problem):', (t) => {
	t.plan(2)

	a = fixtures()[0]
	expected_a = { heuristic: 1, path: ['op1'] }

	relaxed_plan_based(a).then( actual_a => {
		t.deepEqual(actual_a, expected_a, "Heuristic and path as expected A")
	})

	b = fixtures()[1]
	expected_b = { heuristic: 4, path: ['op5', 'op2', 'op3', 'op4'] }

	relaxed_plan_based(b).then( actual_b => {
		t.deepEqual(actual_b, expected_b, "Heuristic and path as expected B")
	})

})
