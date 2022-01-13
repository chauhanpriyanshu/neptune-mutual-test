import styles from '../styles/Home.module.css'
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useEffect, useState } from 'react';
import Wallet from './Wallet';


const Converter = () => {

    const [NEP, setNEP] = useState("");
    const [BUSD, setBUSD] = useState("");

    const handleInputNep = (val) => {
        setNEP(val)
        if(val===""){
            setBUSD("")
        }
        else{
            setBUSD((val*3).toFixed(2))
        }
    }
    const handleInputBusd = (val) => {
        setBUSD(val)
        if(val===""){
            setNEP("")
        }
        else{
            setNEP((val/3).toFixed(2))
        }
    }

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
        }
    }, [])

    return ( 
        <div className={styles.card}>
            <h1>Crypto converter</h1>
            <div className={styles.inputSection}>
                <p>NEP</p>
                <input type="number" value={NEP} onChange={(e)=>{handleInputNep(e.target.value)}} />
            </div>
            <span className={styles.icon}>
            <AutorenewIcon/>
            </span>
            <div className={styles.inputSection}>
                <p>BUSD</p>
                <input type="number" value={BUSD} onChange={(e)=>{handleInputBusd(e.target.value)}} />
            </div>
            <Wallet/>
        </div>
     );
}
 
export default Converter;
