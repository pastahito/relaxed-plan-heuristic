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

module.exports = {
	r_satisfies_g,
	next_r_state,
	rx_state,
	r_applicable_actions
}
