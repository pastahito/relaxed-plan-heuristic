
  /****************/
 /** First Half **/
/****************/

// r_whatever stands for relaxed whatever
// Pure
// Tested
r_satisfies_g = (r_state, state) => {
	for(var s in state){
		if (!r_state.hasOwnProperty(s) || r_state[s].indexOf(state[s]) < 0)
			return false
	}
	return true
}

// Pure
// Tested
r_applicable_actions = (r_state, preconditions) => {
	actions = []
	for(a in preconditions){
		if(r_satisfies_g(r_state, preconditions[a]))
			actions.push(a)
	}
	return actions
}

// Used by next_r_state(...) and rx_state(...)
add_value_to_r_state = (value, r_state, state_variable) => {
	if(r_state.hasOwnProperty(state_variable)){
		if(r_state[state_variable].indexOf(value)<0)
			r_state[state_variable].push(value)
	}else{
		r_state[state_variable] = [value]
	}
}

// No tiene en cuenta que falta unirse al estado relajado anterior
// Tested
rx_state = (actions, postconditions) => {
	r_state = {}
	actions.forEach( action => {
		state = postconditions[action]
		for(state_variable in state){
			value = state[state_variable]
			add_value_to_r_state(value, r_state, state_variable)
		}
	})
	return r_state
}

// Pure
// Siguiente estado relajado teniendo en cuenta el anterior
// Tested
next_r_state = (r_stateA, actions, postconditions) => {
	r_stateB = rx_state(actions, postconditions)
	for(state_variable in r_stateA){
		r_stateA[state_variable].forEach( value => {
			add_value_to_r_state(value, r_stateB, state_variable)
		})
	}
	return r_stateB
}

// Get first relaxed state from initalState
relaxify_state = (initalState) => {
	r_state = {}
	for(state_variable in initalState){
		r_state[state_variable] = [initalState[state_variable]]
	}
	return r_state
}

  /*****************/
 /** Second Half **/
/*****************/

// It looks like spaghetti code at first glance
// But it is a cool generator if you look it twice, I think
function* sec(max) {
	res = []
	for(i=1; i<=max; i++){
		v = [i]
		res.push(v)
		yield v
	}
	while(res[res.length-1].reduce((a, b)=> a + b) != max*(max+1)/2){
		tmp = []
		for(i=0; i<res.length; i++){
			e = res[i]
			for(j=e[e.length-1]+1; j<=max; j++){
				v = e.concat([j])
				tmp.push(v)
				yield v
			}
		}
		res = tmp.map(e => e.slice())
	}
}

// One of the two remaining functions to implement
actions_subset = (g_set, s_set, actions, postconditions) => {
	temp = {}
	for(state_variable in g_set){
		if(!s_set.hasOwnProperty(state_variable)){
			temp[state_variable] = [].concat(g_set[state_variable])
		} else {
			g_set[state_variable].forEach( e => {
				if(s_set[state_variable].indexOf(e) < 0){
					temp[state_variable].push[e]
				}
			})
		}
	}

	//TODO minimal set of actions that their efects r-satisfies temp
	// Use generator from above here
	sub_actions = []
	/* Loop like:
	gen = sec(actions.length)
	sub_actions = index_actions(gen.next().value, actions)
	relaxed_efects = join_efects(sub_actions, postconditions)
	if (relaxed_efects r_satisfies temp){
		break;
	}
	*/


	return sub_actions
}



module.exports = {
	r_satisfies_g,
	next_r_state,
	rx_state,
	r_applicable_actions,
	relaxify_state
}
