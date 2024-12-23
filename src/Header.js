import React, { useState } from "react";
import { ethers } from "ethers";
import dexABI from "./contract.json";
import { Link } from "react-router-dom";


const provider = new ethers.BrowserProvider(window.ethereum);
const dexContractAddress = "0x1B9396bE5DAeDA6E17d66136007e80f8d62E3109";
export const Header = () => {
    const [walletAddress, setWalletAddress] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                console.log("Connected to provider", provider);

                const signer = await provider.getSigner();
                console.log("signer", signer);
                const dexContract = new ethers.Contract(dexContractAddress, dexABI, signer);
                console.log("dex", dexContract);
                // Check the current network
                const network = await provider.getNetwork();
                console.log("Current network:", network);

                const crossfiChainId = 97n; // CrossFi Testnet Chain ID (not a regular number, use 'n' for BigInt)

                if (network.chainId !== crossfiChainId) {
                    alert("You are not connected to the CrossFi Testnet. Please switch your network to bnb Testnet.");
                    return; // Stop execution if on the wrong network
                }
                setWalletAddress(signer.address);
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            alert("MetaMask is not installed. Please install it to use this feature.");
        }
    };

    return (
        <header style={styles.header}>
            <Link to="/" style={styles.title}>BakerySwap</Link>
            {/* <Link to="/add-liquidity" style={styles.title}>Add Liquidity</Link> */}
            <button onClick={connectWallet} style={styles.button}>
                {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
            </button>
        </header>
    );
};

const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#1E293B",
        color: "#ffffff",
    },
    title: {
        margin: 0,
        fontSize: "1.5rem",
        background: "linear-gradient(135deg, rgba(18, 194, 233, 0.9), rgba(196, 113, 237, 0.9), rgba(247, 121, 125, 0.9))", // gradient colors
        WebkitBackgroundClip: "text", // Make the gradient apply to the text
        color: "transparent", // Set the text color to transparent to reveal the gradient
        cursor: "pointer",
    },
    button: {
        padding: "0.5rem 1rem",
        fontSize: "1rem",
        color: "black",
        background: "linear-gradient(135deg, rgba(18, 194, 233, 0.9), rgba(196, 113, 237, 0.9), rgba(247, 121, 125, 0.9))", // gradient colors
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",

    },
};
