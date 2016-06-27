module.exports = () => {
	//Fixtures

	// Problem A
	a = {
		initialState : {
			'p3(O)' : 1, 'p4(O)' : 1
		},
		goalState : {
			'p1(O)' : 1, 'p2(O)' : 1, 'p3(O)' : 1
		},
		preconditions : {
			'op1' : { 'p3(O)' : 1, 'p4(O)' : 1 },
			'op2' : { 'p5(O)' : 1 },
			'op3' : { 'p3(O)' : 1, 'p4(O)' : 1 }
		},
		postconditions : {
			'op1' : { 'p1(O)' : 1, 'p2(O)' : 1 },
			'op2' : { 'p1(O)' : 1, 'p2(O)' : 1, 'p6(O)' : 1	},
			'op3' : { 'p1(O)' : 1, 'p2(O)' : 1, 'p5(O)' : 1 }
		},
		costs : {
			'op1' : 1, 'op2' : 1, 'op3' : 1
		}
	}

	// Problem B
	b = {
		initialState : {
			'p1(O)' : 1
		},
		goalState : {
			'p4(O)' : 1,'p5(O)' : 1
		},
		preconditions : {
			'op1' : { 'p6(O)' : 1 },
			'op2' : { 'p3(O)' : 1 },
			'op3' : { 'p3(O)' : 1 },
			'op4' : { 'p2(O)' : 1 },
			'op5' : { 'p1(O)' : 1 },
			'op6' : { 'p3(O)' : 1 }
		},
		postconditions : {
			'op1' : { 'p6(O)' : 0, 'p2(O)' : 1 },
			'op2' : { 'p4(O)' : 0, 'p5(O)' : 1 },
			'op3' : { 'p3(O)' : 0, 'p2(O)' : 1 },
			'op4' : { 'p2(O)' : 0, 'p5(O)' : 0, 'p4(O)' : 1 },
			'op5' : { 'p3(O)' : 1 },
			'op6' : { 'p1(O)' : 0, 'p5(O)' : 1 }
		},
		costs : {
			'op1' : 1, 'op2' : 1, 'op3' : 1, 'op4' : 1, 'op5' : 1, 'op6' : 1
		},
	}

	return [a, b]
}
