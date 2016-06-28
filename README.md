# relaxed-plan-heuristic

A straightforward implementation in JS of the Relaxed Plan Graph to aproximate an heuristic, one the most popular algorithms in Classical Planning.

However, the main purpose of this project is building my first serious NPM package and getting used to testing in Node.

## Usage

Let's define a classical planning problem about changing a flat tire :whale:!

### What it expects

The problem to solve must be an object with initialState, goalState, preconditions, postconditions and costs as properties:

```js
problem_to_solve = {
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
```

### What it returns

Usage is simple, just require it and you will get an ES6 Promise. Pass the problem to solve as parameter.
It will returns an object with heuristic and solution as properties.

'rpb-heuristic' is the npm package name, it stands for Relaxed-Plan-Based Heuristic.

```js
var rpb = require('rpb-heuristic')

rpb(problem_to_solve).then( obj => {
	h = obj.heuristic  // h = 6
	s = obj.solution  // s = ['remove_flat', 'take_spare', 'store_flat', 'install_spare' ]
	// ...
}).catch( e => {
  // Error handling
  // ...
})
```

## Installation

```bash
$ npm install rpb-heuristic
```

## License

Code released under [the MIT License](LICENSE).
