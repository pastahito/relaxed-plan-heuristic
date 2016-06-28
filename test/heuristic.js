var test = require('tape');
var relaxed_plan_based = require('../lib/index')
var fixtures = require('./fixtures')

test('relaxed_plan_based(problem):', (t) => {
	t.plan(3)

	a = fixtures()[0]
	expected_a = { heuristic: 1, solution: ['op1'] }

	relaxed_plan_based(a).then( actual_a => {
		t.deepEqual(actual_a, expected_a, "Heuristic and solution as expected in problem A")
	})

	b = fixtures()[1]
	expected_b = { heuristic: 4, solution: ['op5', 'op2', 'op3', 'op4'] }

	relaxed_plan_based(b).then( actual_b => {
		t.deepEqual(actual_b, expected_b, "Heuristic and solution as expected in problem B")
	})

	c = fixtures()[2]
	expected_c = { heuristic: 6, solution: ['remove_flat', 'take_spare', 'store_flat', 'install_spare' ] }

	relaxed_plan_based(c).then( actual_c => {
		t.deepEqual(actual_c, expected_c, "Heuristic and solution as expected in problem C")
	})

})
