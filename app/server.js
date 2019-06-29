let ethers = require('ethers')
require('dotenv').config({path: '../.env'})
let utils = ethers.utils
const express = require('express')
const bodyParser = require('body-parser')
const server = express()

let SimpleBank = require('../dist/contracts/SimpleBank.json')
let simpleBankABI = SimpleBank.abiDefinition;
let simpleBankBCODE = SimpleBank.code;

let provider = ethers.getDefaultProvider('ropsten')

let privateKey = process.env.pk

let wallet = new ethers.Wallet(privateKey, provider)

const contractAddress = '0x4931A34E108381ec659271a3A7FbbE6859c4019f'

let readOnlyContract = new ethers.Contract(contractAddress, simpleBankABI, provider)
let WRContact =  readOnlyContract.connect(wallet)

server.use(bodyParser.json())

let  getBalance = async () =>  {
  let balance = Number(await WRContact.balance()) // Because Map variable is Private cannot use READ-ONLY contract.
  return balance
}

let deposity = async (wei) => {
  let tx = await WRContact.deposit({value : utils.parseUnits(parseInt(wei).toString(), 'gwei')}) // returns tx
  return tx
 }

server.get('/', async (req,res,next)=> {
  res.send("Hello World")
})

server.get('/balance', async (req,res,next)=> {
  let balance = await getBalance();
  res.send(Number(balance).toString())
})

server.post('/deposite', async (req,res,next) => {
  let response = await deposity(req.body.wei)
  res.send(response)
})




// getBalance()



// deposity('200000')

WRContact.on("LogDepositMade", (sender, amount)=> {
 console.log(`User : ${sender} has deposit ${amount}`);
})

server.listen(3000)
