# relaxed-plan-heuristic

Vanilla Relaxed-Plan-Based heuristic computing in JS for Classical Planning.

A straightforward implementation of the Relaxed Plan Graph, one the most popular algorithms in Classical Planning.

However, the main purpose of this project is building my first serious NPM package and getting used to testing in Node.

Still in testing :whale:!

### Usage

```js
var rpb = require('rpb-heuristic')

rpb(problem_to_solve).then( obj => {
	h = obj.heuristic
	p = obj.path
})
```

### Installation

```bash
$ npm install pastahito/relaxed-plan-heuristic
```

### License

Code released under [the MIT License](LICENSE).
