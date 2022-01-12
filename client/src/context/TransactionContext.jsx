//only for conecting to the blockchain and write all of our logic here
import React, { useEffect, useState, createContext } from 'react';
import { ethers } from 'ethers';

import toast, { Toaster } from 'react-hot-toast';

import { contractABI, contractAddress } from '../Utils/constants';

export const TransactionContext = createContext();

const { ethereum } = window; //ethereum object from window

const Notify = () => toast('please install metamask');

//Fetch the ethereum contract
const createEthereumContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const transactionsContract = new ethers.Contract(
		contractAddress,
		contractABI,
		signer
	);
	console.log({ provider, signer, transactionsContract });
};

export const TransactionProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState('');

	const [formData, setformData] = useState({
		addressTo: '',
		amount: '',
		keyword: '',
		message: '',
	});

	const [isLoading, setIsLoading] = useState(false);
	const [transactionCount, settransactionCount] = useState(
		localStorage.getItem('transactionCount')
	);

	const handleChange = (e, name) => {
		setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
	};

	const checkIfWalletIsConnected = async () => {
		try {
			if (!ethereum) return 'please install metamask';

			const accounts = await ethereum.request({ method: 'eth_accounts' }); //get the account from metamask

			console.log(accounts);

			if (accounts.length) {
				setCurrentAccount(accounts[0]);
			} else {
				console.log('no account found');
			}
		} catch (error) {
			console.log(error);

			throw error('No ethereum object found');
		}
	};

	const connectWallet = async () => {
		try {
			if (!ethereum) return alert('Please install MetaMask.');

			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});
			console.log('acc:', accounts);

			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
			throw new Error('No ethereum object');
		}
	};

	const sendTransaction = async () => {
		try {
			if (ethereum) {
				const { addressTo, amount, keyword, message } = formData;
				const transactionsContract = createEthereumContract();
				const parsedAmount = ethers.utils.parseEther(amount);

				await ethereum.request({
					method: 'eth_sendTransaction',
					params: [
						{
							from: currentAccount,
							to: addressTo,
							gas: '0x5208',
							value: parsedAmount._hex,
						},
					],
				});

				const transactionHash = await transactionsContract.addToBlockchain(
					addressTo,
					parsedAmount,
					message,
					keyword
				);

				setIsLoading(true);
				console.log(`Loading - ${transactionHash.hash}`);
				await transactionHash.wait();
				console.log(`Success - ${transactionHash.hash}`);
				setIsLoading(false);

				const transactionsCount =
					await transactionsContract.getTransactionCount();

				setTransactionCount(transactionsCount.toNumber());
			} else {
				console.log('No ethereum object');
			}
		} catch (error) {
			console.log(error);

			throw new Error('No ethereum object');
		}
	};

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	return (
		<TransactionContext.Provider
			value={{
				connectWallet,
				currentAccount,
				sendTransaction,
				handleChange,
				formData,
			}}
		>
			{children}
		</TransactionContext.Provider>
	);
};

export default TransactionProvider;
