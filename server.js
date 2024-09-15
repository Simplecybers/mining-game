// server.js
const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Web3 with an Infura provider (you'll get this later)
//const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

// Middleware
app.use(bodyParser.json());

// Simulated database (replace with a real DB later)
let users = {};

// POST: Claim Rewards
app.post('/claim-rewards', async (req, res) => {
    const { tokens, walletAddress } = req.body;

    if (!walletAddress || !tokens) {
        return res.status(400).json({ success: false, message: 'Invalid request' });
    }

    try {
        // Simulate transaction logic (you'll expand this with actual blockchain interactions)
        const transaction = await sendCryptoReward(walletAddress, tokens);

        if (transaction) {
            users[walletAddress] = tokens;
            return res.json({ success: true, transaction });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error processing the claim' });
    }
});

// Function to simulate sending crypto reward
async function sendCryptoReward(walletAddress, amount) {
    const senderAddress = process.env.SENDER_ADDRESS;
    const privateKey = process.env.PRIVATE_KEY;

    const transaction = {
        to: walletAddress,
        value: web3.utils.toWei(amount.toString(), 'ether'),
        gas: 2000000
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(transaction, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

    return receipt;
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});