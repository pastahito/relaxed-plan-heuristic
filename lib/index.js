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
		s_stack = [util.relaxify_state(p.initialState)]
		i = 0

		while(!util.r_satisfies_g(s_stack[i], p.goalState)){
			actions = util.r_applicable_actions(s_stack[i], p.preconditions)
			a_stack.push(actions)

			next_s = util.next_r_state(s_stack[i], actions, p.postconditions)
			s_stack.push(next_s)

			i++
		}

		console.log(s_stack);
		console.log(a_stack);

		// Algorithm pt2 starts here...
		g_stack = [util.relaxify_state(p.goalState)]
		path = []
		for(j=i; j>0; j--){
			sub_actions = util.actions_subset(g_stack[i-j], s_stack[j-1], a_stack[j-1], p.postconditions)
			path = path.concat(sub_actions)

			next_g = util.next_g_set(sub_actions, g_stack[i-j], p.preconditions, p.postconditions)
			g_stack.push(next_g)
		}

		resolve(p)
		reject()
	})
 }

module.exports = heuristic
