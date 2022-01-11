//only for conecting to the blockchain and write all of our logic here
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import toast, { Toaster } from 'react-hot-toast';

import { contractABI, contractAddress } from '../Utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window; //ethereum object from window

const Notify = () => toast('please install metamask');

//Fetch the ethereum contract
const getEthereumContract = () => {
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
		amount: '',
		addressTo: '',
		keyword: '',
		message: '',
	});

	const handleChange = (e, name) => {
		setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
	};

	const checkIfWalletIsConnected = async () => {
		try {
			if (!ethereum) return Notify();

			const accounts = await ethereum.request({ method: 'eth_accounts' }); //get the account from metamask

			if (accounts.length) {
				setCurrentAccount(accounts[0]);
			} else {
				acccountNofitfication();
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

			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);

			throw new Error('No ethereum object');
		}
	};

	const sendTransaction = async () => {
		try {
			if (!ethereum) return Notify();
			const { adressTo, amount, message, keyword } = formData;
			const transactionsContract = createEthereumContract();

			getEthereumContract();
		} catch (error) {
			console.log(error);

			throw error('No ethereum object found');
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
