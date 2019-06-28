import ethers from 'ethers'
let ethers = require('ethers')
require('dotenv').config()
let utils = ethers.utils
let SimpleBank = require('./dist/contracts/SimpleBank.json')

let simpleBankABI = SimpleBank.abiDefinition;
let simpleBankBCODE = SimpleBank.code;

let provider = ethers.getDefaultProvider('ropsten')

let privateKey = process.env.pk

let wallet = new ethers.Wallet(privateKey, provider)

const contractAddress = '0x4931A34E108381ec659271a3A7FbbE6859c4019f'

let readOnlyContract = new ethers.Contract(contractAddress, simpleBankABI, provider)
let WRContact =  readOnlyContract.connect(wallet)


let  getBalance = async () =>  {
  let balance = Number(await WRContact.balance()) // Because Map variable is Private cannot use READ-ONLY contract.
  console.log(balance)
}

getBalance()

let deposity = async () => {
 let tx = await WRContact.deposit({value : utils.parseUnits('1', 'gwei')}) // returns tx
 console.log(tx)
}

deposity()

WRContact.on("LogDepositMade", (sender, amount)=> {
 console.log(`User : ${sender} has deposit ${amount}`);
})
