import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

//INTERNAL IMPORTS
import Tracking from './Tracking.json';
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = Tracking.abi;

//--FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) => 
    new ethers.Contract(ContractAddress, contractABI, signerOrProvider);

export const TrackingContext = React.createContext();
export const TrackingProvider = ({ children }) => {
    //STATE VARIABLES
    const DappName = "Product Tracking";
    const [currentUser, setCurrentUser] = useState("");

    const createShipment = async (items) => {
        console.log(items);
        const { receiver, pickupTime, distance, price} = items;
        
        try {
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const createItem = await contract.createShipment(receiver, new Date(pickupTime).getTime(), distance, ethers.utils.parseUnits(price,18));
            await createItem.wait();
            console.log(createItem);
        }
        catch (error) {
            console.log("some want wrong", error);
        }
    }
    
    const getAllShipments = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipment = await contract.getAllTransactions();
            const allShipments = shipment.map((shipment) => ({
                    sender: shipment.sender,
                    receiver: item.receiver,
                    price: ethers.utils.formatUnits(shipment.price.toString()),
                    pickupTime: new Date(shipment.pickupTime.toNumber()),
                    distance: shipment.distance.toNumber(),
                    isPaid: shipment.isPaid,
                    status: shipment.status,
            }));

            console.log(shipment);
            return allShipments;
        }
        catch (error) {
            console.log("some want wrong", error);
        }
    }

    const getShipmentCount = async () => {
        try {
            if(!window.ethereum) return "Install Metamask";
            
            const accounts = await window.ethereum.request({ method: 'eth_Accounts' });
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipmentCount = await contract.getShipmentCount(accounts[0]);
        } catch (error) {
            console.log("some want wrong", error);
        }
    }

    const completeShipment = async (completeShip) => {
        console.log(completeShip);

        const { receiver, index } = completeShip;
        try {
            if (!window.ethereum) return "Install Metamask";

            const accounts = await window.ethereum.request({ method: 'eth_Accounts' });
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.completeShipment(accounts[0], receiver, index, {gasLimit: 300000});

            transaction.wait();
            console.log(transaction);
        } catch (error) {
            console.log("some want wrong", error);
        }
    }

    const getShipment = async (index) => {
        console.log(index*1);
        try {
            if(!window.ethereum) return "Install Metamask";

            const accounts = await window.ethereum.request({ method: 'eth_Accounts' });
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipment = await contract.getShipment(accounts[0], index*1);
            
            const SingleShipment = {
                sender: shipment[0],
                receiver: shipment[1],
                pickupTime: new Date(shipment[2].toNumber()),
                deliveryTime: shipment[3].toNumber(),
                distance: shipment[4].toNumber(),
                price: ethers.utils.formatUnits(shipment[5].toString()),
                status: shipment[6],
                isPaid: shipment[7]
        };
        return SingleShipment;
        }catch (error) {
            console.log("some want wrong", error);
        }
    }

    const startShipment = async (getProduct) => {
        const { receiver, index } = getProduct;
        try {
            if (!window.ethereum) return "Install Metamask";

            const accounts = await window.ethereum.request({ method: 'eth_Accounts' });
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const shipment = await contract.startShipment(accounts[0], receiver, index*1);

            shipment.wait();
            console.log(shipment);
        } catch (error) {
            console.log("some want wrong", error);
        }
    }

    // --Check wallet connection
    const checkIfWalletIsConnected = async () => {
        try {
            if (!window.ethereum) return "Install Metamask";

            const accounts = await window.ethereum.request({ method: 'eth_Accounts' });

            if (accounts.length > 0) {
                setCurrentUser(accounts[0]);
            } else {
                return "No account found";
            }
        } catch (error) {
            console.log("some want wrong", error);
        }
    }

    //--CONECT WALLET FUNCTION
    const connectWallet = async () => {
        try {
            if (!window.ethereum) return "Install Metamask";

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentUser(accounts[0]);
            } catch (error) {
                console.log("some want wrong", error);
            }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TrackingContext.Provider value={{
            DappName,
            currentUser,
            connectWallet,
            createShipment,
            getAllShipments,
            getShipmentCount,
            completeShipment,
            getShipment,
            startShipment
        }}>
            {children}
        </TrackingContext.Provider>
    );
}