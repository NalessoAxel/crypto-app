// https://eth-ropsten.alchemyapi.io/v2/8Lr0bSxD8vjCGyluhpiCaCswHCI-Ygkc

require('@nomiclabs/hardhat-waffle');

require('dotenv').config();

const ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY;

const URL = process.env.URL_PRIVATE_KEY;

// const {
// 	TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD,
// } = require('hardhat/builtin-tasks/task-names');
// const path = require('path');

// subtask(TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD, async (args, hre, runSuper) => {
// 	if (args.solcVersion === '0.8.5') {
// 		const compilerPath = path.join(
// 			__dirname,
// 			'soljson-v0.8.5-nightly.2021.5.12+commit.98e2b4e5.js'
// 		);

// 		return {
// 			compilerPath,
// 			isSolcJs: true, // if you are using a native compiler, set this to false
// 			version: args.solcVersion,
// 			// this is used as extra information in the build-info files, but other than
// 			// that is not important
// 			longVersion: '0.8.5-nightly.2021.5.12+commit.98e2b4e5',
// 		};
// 	}

// 	// we just use the default subtask if the version is not 0.8.5
// 	return runSuper();
// });

module.exports = {
	solidity: '0.8.5',
	settings: {
		optimizer: {
			enabled: true,
			runs: 1000,
		},
	},
	networks: {
		ropsten: {
			url: 'https://eth-ropsten.alchemyapi.io/v2/8Lr0bSxD8vjCGyluhpiCaCswHCI-Ygkc',
			accounts: [
				'7ca0f67f89a035ce7f6907095bc5d5a8107c90a7992b31049b5fd984ac57d36d',
			], // list of accounts to use
		},
	},
};
