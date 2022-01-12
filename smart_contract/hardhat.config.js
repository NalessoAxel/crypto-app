// https://eth-ropsten.alchemyapi.io/v2/8Lr0bSxD8vjCGyluhpiCaCswHCI-Ygkc
require('@nomiclabs/hardhat-waffle');

module.exports = {
	solidity: '0.8.0',
	networks: {
		ropsten: {
			url: 'https://eth-ropsten.alchemyapi.io/v2/8Lr0bSxD8vjCGyluhpiCaCswHCI-Ygkc',
			accounts: [
				'7ca0f67f89a035ce7f6907095bc5d5a8107c90a7992b31049b5fd984ac57d36d',
			], // list of accounts to use
		},
	},
};
