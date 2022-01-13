// Neptune Mutual Test
// Author: Priyanshu Chauhan
// Last Updated: 14 Jan 2021 2:45 AM

import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import styles from '../styles/Wallet.module.css'
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';

const Wallet = (props) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setconnected(false)
    };

	const [defaultAccount, setDefaultAccount] = useState(null);
    const [userAccount, setuserAccount] = useState(null);
    const [chainID, setchainID] = useState(null)
	const [userBalance, setUserBalance] = useState(null);
	const [provider, setProvider] = useState(null);
    const [connected, setconnected] = useState(false);

	const connectWalletHandler = () => {
		if (window.ethereum && defaultAccount == null) {
			setProvider(new ethers.providers.Web3Provider(window.ethereum));
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				setDefaultAccount(result[0]);
				setuserAccount(result[0]);
                setconnected(true)
                enqueueSnackbar("Connected", { 
                    variant: 'success',
                });
			})
			.catch(error => {
                enqueueSnackbar(error.message, { 
                    variant: 'error',
                });
			});

		} else if (!window.ethereum){
            enqueueSnackbar('Please install MetaMask browser extension to interact', { 
                variant: 'error',
            });
		}
	}

    useEffect(() => {
        if(defaultAccount){
            provider.getBalance(defaultAccount)
            .then(balanceResult => {
                setUserBalance(ethers.utils.formatEther(balanceResult));
            })
            provider.getNetwork(defaultAccount)
            .then(result => {
                setchainID(result.chainId)
            })
            setDefaultAccount(null)
        };
    }, [defaultAccount]);

    return ( 
        <div>
            <button onClick={handleOpen} className={styles.btn}>Check Wallet Details</button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className={styles.modalContainer}>
                    
                    <div className={styles.modalFace}>
                        <div className={styles.modalHead}>
                            <h1>Wallet details</h1>
                            <button onClick={handleClose}>
                                <CloseIcon />
                            </button>
                        </div>
                        {
                            (connected===false)?
                            <>
                                <p className={styles.errorMsg}>Wallet not connected. Please click the Connect button below.</p>
                                <div className={styles.actionContainer}>
                                    <Button onClick={connectWalletHandler} variant="contained">Connect</Button>
                                    <Button onClick={handleClose} color="warning" variant="contained">Cancel</Button>
                                </div>
                            </>
                            :
                            <>
                                <div className={styles.detailContainer}>
                                    <div className={styles.detailHead}>
                                        <span>Key</span>
                                        <span>Value</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span>Account</span>
                                        <span>{userAccount}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span>Chain ID</span>
                                        <span>{chainID}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span>Balance</span>
                                        <span>{userBalance}</span>
                                    </div>
                                </div>
                                <div className={styles.actionContainer}>
                                    <Button onClick={handleClose} color="error" variant="contained">Disconnect</Button>
                                </div>
                            </>

                        }
                    </div>
                </div>
            </Modal>
        </div>
     );
}
 
export default Wallet;