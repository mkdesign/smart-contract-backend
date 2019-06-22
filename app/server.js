const ethers = require('ethers');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const server = express();

//Get contract info 
let contractInfo = require('../dist/contracts/Courestro.json');
let bytecode = contractInfo.code;
//let ABI = require('ABI.json');
let ABI = contractInfo.abiDefinition;

let provider = ethers.getDefaultProvider('kovan');


// view (function) || public variable 
let readOnly = new ethers.Wallet(process.env.pk);

// can be used for anything 
let readAndWrite = readOnly.connect(provider); //kovan
let readAndWriteMainnet = readOnly.connect(mainnetProvider);
let readAndWrite_2 = new ethers.Wallet(process.env.pk, provider);


let contractAddress = "0x692a70d2e424a56d2c6c27aa97d1a86395877b3a"
let readOnlyContract = new ethers.Contract(contractAddress, ABI, provider); //contract -> kovan

let readAndWriteContract = readOnlyContract.connect(readAndWrite);

// Call functions 
async function getValue() {
  let value = await readOnlyContract.getValue();
  return value;
} 

async function setValue(number) {
  console.log(number);
  let tx = await readAndWriteContract.setValue(number);
  return tx;
} 

// Server
server.set('port',process.env.PORT);
server.use(bodyParser.json());

// GET request, name: getValue
server.get('/getValue', async (request, response) => {
  let value = await getValue();
  response.send(value.toNumber().toString());
});

server.post('/setValue', async (request, response) => {
  let value = await setValue(request.body.integer);
  response.send(value);
});

//Event Listener
readAndWriteContract.on("ValueChanged", (author, oldVal, newVal) => {
  console.log("author: ", author);
  console.log("old, new ", oldVal.toNumber(), newVal.toNumber());
});
*/

server.listen(process.env.PORT);