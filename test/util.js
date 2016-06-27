var test = require('tape');
var util = require('../lib/util')
var fixtures = require('./fixtures')

test('r_satisfies_g(r_state, state):', (assert) => {
	f = fixtures()[0]
	r_state_ok = { 'p1(O)' : [0, 1], 'p5(O)' : [1], 'p2(O)' : [1, 0], 'p3(O)' : [0, 1] }
	actual = util.r_satisfies_g(r_state_ok, f.goalState)
	expected = true
	assert.equal(actual, expected, 'Goal state should be satisfied by r-state_ok')

	r_state_fail = { 'p1(O)' : [1], 'p5(O)' : [1], 'p3(O)' : [0] }
	actual = util.r_satisfies_g(r_state_fail, f.goalState)
	expected = false
	assert.equal(actual, expected, 'Goal state shouldn\'t be satisfied by r-state_fail')
	assert.end()
})

test('rx_state(actions, r_state):', (assert) => {
	f = fixtures()[0]
	actions = [ 'op1', 'op2', 'op3' ]
	actual = util.rx_state(actions, f.postconditions)
	expected = { 'p1(O)': [1], 'p2(O)': [1], 'p6(O)': [1], 'p5(O)': [1] }
	assert.deepEqual(actual, expected, "Positive mainstream test")

	actions = [ 'op4', 'op5', 'op6' ]
	actual = util.rx_state(actions, f.postconditions)
	expected = { }

	assert.deepEqual(actual, expected, "Negative mainstream test")
	assert.end()
})

test('r_applicable_actions(r_state, preconditions):', (assert) => {
	f = fixtures()[0]
	r_state = { 'p1(O)' : [0, 1], 'p2(O)' : [1, 0], 'p3(O)' : [0, 1] , 'p4(O)' : [0, 1] }

	actual = util.r_applicable_actions(r_state, f.preconditions)
	expected = [ 'op1', 'op3']

	assert.deepEqual(actual, expected, "Positive mainstream test")
	assert.end()
})

test('next_r_state(r_stateA, actions):', (assert) => {
	f = fixtures()[0]
	r_stateA = { 'p3(O)' : [1], 'p4(O)' : [1] }
	actions = [ 'op1', 'op3']

	actual = util.next_r_state(r_stateA, actions, f.postconditions)
	expected = { 'p1(O)' : [1], 'p2(O)' : [1], 'p5(O)' : [1], 'p3(O)' : [1], 'p4(O)' : [1] }

	assert.deepEqual(actual, expected, "Positive mainstream test")
	assert.end()
})
