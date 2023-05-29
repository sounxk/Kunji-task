this is an assignment for kunji finance

0x3B593016B21a9bA86ceFDE74Ab8A0FD0C7062B99 
^^ etherscan address for contract

Copy code from contracts and put it in remix. works fine

dropping the steps followed
1. basic set up for yarn and hardhat
2. writing the contract
3. writing the deployment function
4. wrote basic test for all
5. change address input to string during testing with values for quick check

step 1: Clone the git repo
```
git clone https://github.com/sounxk/Kunji-Assignment.git
```

step 2: Install the required dependencies by running 
```
yarn
```
or just install hardhat through 
```
yarn add --dev hardhat hardhat-deploy
```
and other dependencies that you might need can be added accordingly

step 3: compile the contracts

```
yarn hardhat compile
```

step 4: deploy on testnet
```
yarn hardhat deploy --network hardhat
```
step 5: if you want to deploy on sepolia
```
yarn hardhat deploy --network sepolia
```
step 6: run tests
```
yarn hardhat test
```

future work: add a small gui, fix documentation, 


