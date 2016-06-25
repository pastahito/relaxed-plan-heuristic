var util = require('./util')

// No need to parse the input from PDDL or whatever
// since it's expected to receive it as an object

// Receives the properly formatted Object
// Return heuristic
var heuristic = (problem) => {
	return new Promise( (resolve, reject) => {

		p = Object.assign({}, problem)

		// Algorithm pt1 starts here...
		a_stack = []
		s_stack = [{ 'p3(O)' : [1], 'p4(O)' : [1] }]
		i = 0

		while(!util.r_satisfies_g(s_stack[i], p.goalState)){
			actions = util.r_applicable_actions(s_stack[i], p.preconditions)
			a_stack.push(actions)

			new_r_state = util.next_r_state(s_stack[i], actions, p.postconditions)
			s_stack.push(new_r_state)

			i++
		}

		// TODO: Algorithm pt2

		resolve(p)
		reject()
	})
 }

module.exports = heuristic
