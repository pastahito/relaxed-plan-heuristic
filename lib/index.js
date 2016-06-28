var util = require('./util')

// No need to parse the input from PDDL or whatever
// since it's expected to receive it as an object
// Return the heuristic and the solution
module.exports = (problem) => {
	return new Promise( (resolve, reject) => {
		p = Object.assign({}, problem)

		// Algorithm pt1 starts here...
		a_stack = []
		s_stack = [util.relaxify_state(p.initialState)]
		n = 0
		while(!util.r_satisfies_g(s_stack[n], p.goalState)){
			actions = util.r_applicable_actions(s_stack[n], p.preconditions)
			a_stack.push(actions)

			next_s = util.next_r_state(s_stack[n], actions, p.postconditions)
			s_stack.push(next_s)
			n++
		}

		// Algorithm pt2 starts here...
		g_stack = [util.relaxify_state(p.goalState)]
		solution = []
		for(m = n; m > 0; m--){
			sub_actions = util.actions_subset(g_stack[n - m], s_stack[m - 1], a_stack[m - 1], p.postconditions)
			solution = sub_actions.concat(solution)

			next_g = util.next_g_set(sub_actions, g_stack[n - m], p.preconditions, p.postconditions)
			g_stack.push(next_g)
		}

		resolve({
			heuristic: solution.map(e => p.costs[e]).reduce((a,b) => a + b),
			solution: solution
		})
		reject()
	})
 }
