'use strict';
/*global module, require */
const fsPromise = require('../util/fs-promise'),
	path = require('path');
module.exports = function saveResultFiles(examples, resultsDir, template) {

	const exampleNames = Object.keys(examples),
		saveExampleResult = function (exampleName) {
			const example = examples[exampleName],
				contents = template({
					exampleName: exampleName,
					example: example
				});
			return fsPromise.writeFileAsync(path.join(resultsDir, example.index + '-result.html'), contents, 'utf8');
		};

	return Promise.all(exampleNames.map((exampleName) => saveExampleResult(exampleName)))
		.then(() => examples);
};
