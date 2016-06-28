
  /************/
 /** Common **/
/************/

// Get first relaxed state from initalState
relaxify_state = (initalState) => {
	r_state = {}
	for(state_variable in initalState){
		r_state[state_variable] = [initalState[state_variable]]
	}
	return r_state
}

  /****************/
 /** First Half **/
/****************/

// Returns true if r_state r-satsfies a given state
r_satisfies_g = (r_state, state) => {
	for(var s in state){
		if (!r_state.hasOwnProperty(s) || r_state[s].indexOf(state[s]) < 0)
			return false
	}
	return true
}

// Returns the actions that can be applied in r_state
r_applicable_actions = (r_state, preconditions) => {
	actions = []
	for(a in preconditions){
		if(r_satisfies_g(r_state, preconditions[a]))
			actions.push(a)
	}
	return actions
}

// Returns the next r_state given the former and the actions to apply
next_r_state = (r_stateA, actions, postconditions) => {
	r_stateB = rx_state(actions, postconditions)
	for(state_variable in r_stateA){
		r_stateA[state_variable].forEach( value => {
			add_value_to_r_state(value, r_stateB, state_variable)
		})
	}
	return r_stateB
}

  /*****************/
 /** Second Half **/
/*****************/

// Returns subset of actions to r-satisfy g_set
actions_subset = (g_set, s_set, actions, postconditions) => {

	temp = g_minus_s(g_set, s_set)
	minimal_actions = []
	gen = permutations(actions.length)

	while(true){
		sec = gen.next()
		if (sec.done) break

		minimal_actions = sec.value.map(e => actions[e-1])
		efects = group_efects(minimal_actions, postconditions)

		if (e_contains_t(efects, temp))	break
	}
	return minimal_actions
}

// Returns next r_goalState from given actions and former r_goalState (g_set)
next_g_set = (actions, g_set, preconditions, postconditions) => {
	res = {}
	actions.forEach( a => {
		post = postconditions[a]
		for (g in g_set) {
			if (!post.hasOwnProperty(g)) {
				res[g] = [].concat(g_set[g])
			} else {
				g_set[g].forEach( e => {
					if (e!=post[g]) {
						if (res.hasOwnProperty(g)) {
							res[g].push(e)
						} else {
							res[g] = [e]
						}
					}
				})
			}
		}
		pre = preconditions[a]
		for (r in pre) {
			if (res.hasOwnProperty(r)){
				res[r].push(pre[r])
			} else {
				res[r] = [pre[r]]
			}
		}
	})
	return res
}

  /****************/
 /** Ancilliary **/
/****************/

// Used by next_r_state(...)
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

// Used by next_r_state(...) and rx_state(...)
add_value_to_r_state = (value, r_state, state_variable) => {
	if(r_state.hasOwnProperty(state_variable)){
		if(r_state[state_variable].indexOf(value)<0)
			r_state[state_variable].push(value)
	}else{
		r_state[state_variable] = [value]
	}
}

// It looks like spaghetti code at first glance
// But it is a cool generator if you look it twice, I think
function* permutations(max) {
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

// Returns complement of s_set in g_set, or g_set - s_set
g_minus_s = (g_set, s_set) => {
	temp = {}
	for(state_variable in g_set){
		if(!s_set.hasOwnProperty(state_variable)){
			temp[state_variable] = [].concat(g_set[state_variable])
		} else {
			g_set[state_variable].forEach( e => {
				if(s_set[state_variable].indexOf(e) < 0){
					if(temp.hasOwnProperty(state_variable)){
						temp[state_variable].push[e]
					}else{
						temp[state_variable] = [e]
					}
				}
			})
		}
	}
	return temp
}
// Return al the efects of given actions as a r-state
group_efects = (minimal_actions, postconditions) => {
	efects = {}
	minimal_actions.forEach( a => {
		post = postconditions[a]
		for(s in post){
			if(efects.hasOwnProperty(s) && efects[s].indexOf(post[s]<0)){
				efects[s].push(post[s])
			} else if(!efects.hasOwnProperty(s)){
				efects[s] = [post[s]]
			}
		}
	})
	return efects
}

// Returns true is efects contains temp, both are r_states
e_contains_t = (efects, temp) => {
	contained = true
	for(var t in temp){
		if (!efects.hasOwnProperty(t)){
			contained = false
			break
		} else {
			for(x in temp[t]){
				if(efects[t].indexOf(temp[t][x])<0){
					contained = false
					break
				}
			}
		}
	}
	return contained
}



module.exports = {
	r_satisfies_g,
	next_r_state,
	rx_state,
	r_applicable_actions,
	relaxify_state,
	actions_subset,
	next_g_set
}
