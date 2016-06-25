module.exports = () => {

	//Fixtures
	f = {}

	f.initialState = { 'p3(O)' : 1, 'p4(O)' : 1 }

	f.goalState = { 'p1(O)' : 1, 'p2(O)' : 1, 'p3(O)' : 1 }

	f.preconditions = {
		'op1' : { 'p3(O)' : 1, 'p4(O)' : 1 },
		'op2' : { 'p5(O)' : 1 },
		'op3' : { 'p3(O)' : 1, 'p4(O)' : 1 }
	}

	f.postconditions = {
		'op1' : { 'p1(O)' : 1, 'p2(O)' : 1 },
		'op2' : { 'p1(O)' : 1, 'p2(O)' : 1, 'p6(O)' : 1	},
		'op3' : { 'p1(O)' : 1, 'p2(O)' : 1, 'p5(O)' : 1 }
	}

	f.costs = { 'op1' : 1, 'op2' : 1, 'op3' : 1 }

	return f
}

