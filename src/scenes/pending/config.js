module.exports = {
    providerURL: "https://brave-separately-sawfish.ngrok-free.app",
    privateKey: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    walletAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    contractABI: [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_price",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_date",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_customerID",
              "type": "string"
            }
          ],
          "name": "addPurchase",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getAllPurchases",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "price",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "date",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "customerID",
                  "type": "string"
                }
              ],
              "internalType": "struct PurchaseRecord.Purchase[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "getPurchase",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "date",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "customerID",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getPurchaseCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "purchases",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "date",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "customerID",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
    ]
};
