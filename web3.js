if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);

    // Connect to MetaMask
    async function connectWallet() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        document.getElementById('walletAddress').value = account;
    }

    document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
}
