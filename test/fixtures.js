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

	// Problem C
	c = {
		initialState : {
			'tire_in(axle)' : 'flat_tire',
			'tire_in(trunk)' :  'spare_tire',
			'location(flat_tire)' : 'axle',
			'location(spare_tire)' : 'trunk'
		},
		goalState : {
			'tire_in(axle)' : 'spare_tire',
			'tire_in(trunk)' : 'flat_tire'
		},
		preconditions : {
			'remove_flat' : { 'location(flat_tire)' : 'axle' },
			'store_flat' : { 'location(flat_tire)' : 'floor', 'tire_in(trunk)' : 'none' },
			'take_spare' : { 'location(spare_tire)' : 'trunk' },
			'install_spare' : { 'location(spare_tire)' : 'floor', 'tire_in(axle)' : 'none'	}
		},
		postconditions : {
			'remove_flat' : { 'location(flat_tire)' : 'floor', 'tire_in(axle)' : 'none' },
			'store_flat' : { 'location(flat_tire)' : 'trunk', 'tire_in(trunk)' : 'flat_tire' },
			'take_spare' : { 'location(spare_tire)' : 'floor', 'tire_in(trunk)' : 'none' },
			'install_spare' : { 'location(spare_tire)' : 'axle', 'tire_in(axle)' : 'spare_tire' }
		},
		costs : {
			'remove_flat' : 2,
			'store_flat' : 1,
			'take_spare' : 1,
			'install_spare' : 2
		}
	}

	return [a, b, c]
}
