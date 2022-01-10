const main = async () => {
	const Transactions = await hre.ethers.getContractFactory('Transactions'); // get Transactions contract
	const transactions = await Transactions.deploy(); // get address of Transactions contract

	await transactions.deployed();

	console.log('Transactions deployed to:', transactions.address); // print address of Transactions contract
};

const runMain = async () => {
	try {
		await main(); // call main function
		process.exit(0); // exit with success
	} catch (err) {
		console.error(err);
		process.exit(1); // exit with errors
	}
};

runMain();
