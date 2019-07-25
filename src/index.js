//Required Packages
const Web3 = require("../node_modules/web3/");
const web3_utils = require("web3-utils");

//Web 3 instance
let web3 = new Web3(ethereum);
const BN = web3.utils.BN;

//User permission; to be able to inject user wallet into web
const userPermission = async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable();
      /// Acccounts now exposed
      /*web3.eth.sendTransaction({
        // ... //
      });*/
    } catch (error) {
      // User denied account access...
    }
  }
  // Non-dapp browsers...
  else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

//Contract abi which enables you to communicate with smart contract
// Copy paste the same abi
const abi = [
  {
    constant: true,
    inputs: [
      {
        name: "_id",
        type: "uint256"
      }
    ],
    name: "getCarLeft",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_id",
        type: "uint256"
      }
    ],
    name: "getCarFront",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_id",
        type: "uint256"
      }
    ],
    name: "getCarBack",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_name",
        type: "string"
      },
      {
        name: "_speed",
        type: "uint256"
      },
      {
        name: "_crashed",
        type: "string"
      },
      {
        name: "_right",
        type: "uint256"
      },
      {
        name: "_left",
        type: "uint256"
      },
      {
        name: "_front",
        type: "uint256"
      },
      {
        name: "_back",
        type: "uint256"
      }
    ],
    name: "addCar",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_id",
        type: "uint256"
      }
    ],
    name: "getCarRight",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_id",
        type: "uint256"
      }
    ],
    name: "getCarSpeed",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_id",
        type: "uint256"
      }
    ],
    name: "getCarName",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_id",
        type: "uint256"
      }
    ],
    name: "getCarCrashed",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

//smart contract address
const address = "0xeA919DE32A212fd511e0F18F2c05831e963594c1";
const contract = new web3.eth.Contract(abi, address);

//Get the address of the connected metamask
function account() {
  return new Promise((resolve, reject) => {
    let currentAccount;
    web3.eth.getAccounts((err, res) => {
      if (!err) {
        currentAccount = String(res);
      } else {
        console.log(err);
        reject(err.message);
      }
      var account = currentAccount;
      resolve(account);
    });
  });
}

web3.eth.getTransactionCount(address).then(res => console.log(res));

//Users Metamask account
userAccount = "0x1e1B5dE4961Cd3013412Bcb7aa684a52A2fd66a6";

// Set function for the variables defined in the contract.
async function setAttributes(name, speed, crashed, right, left, front, back) {
  //Gas price to send the transaction
  let gasPrice = new BN(5) * 10 ** 9; //5 Gwei
  let gas = new BN(500000);
  return await contract.methods
    .addCar(name, speed, crashed, right, left, front, back)
    //Send the transaction
    .send({
      from: userAccount,
      gasPrice: gasPrice,
      gas: gas
    });
}

//Determine which car to display
//This will be triggered when there is a change in dropdown menu
const carNumber = async () => {
  try {
    let number = await document.querySelector(".dropbtn").value;
    return number;
  } catch (error) {
    console.log(error);
  }
};

//Probably not the best way to get all the inputs. But we can't return an
//array in Solidity (At least, we weren't able to a year ago). That's why
//we created bunch of get functions
// in the smart contract.

const getUserInputs = async number => {
  try {
    const carName = await contract.methods.getCarName(number).call();
    const carSpeed = await contract.methods.getCarSpeed(number).call();
    const carCrashed = await contract.methods.getCarCrashed(number).call();
    const carRight = await contract.methods.getCarRight(number).call();
    const carLeft = await contract.methods.getCarLeft(number).call();
    const carFront = await contract.methods.getCarFront(number).call();
    const carBack = await contract.methods.getCarBack(number).call();
    const array = [
      carName,
      carSpeed,
      carCrashed,
      carRight,
      carLeft,
      carFront,
      carBack
    ];
    return array;
  } catch (error) {
    console.log(error);
  }
};

$(document).ready(function() {
  $("#inputSubmit").on("click", async () => {
    try {
      //get user permission for metamask
      await userPermission();

      let name = document.querySelector("#ownerInput").value;
      let speed = document.querySelector("#speedInput").value;
      let crashed = document.querySelector("#crashedInput").value;
      let right = document.querySelector("#rightInput").value;
      let left = document.querySelector("#leftInput").value;
      let front = document.querySelector("#frontInput").value;
      let back = document.querySelector("#backInput").value;
      await setAttributes(name, speed, crashed, right, left, front, back);
    } catch (error) {
      console.log(error);
    }
  });
  function onChange() {
    carNumber()
      .then(res => getUserInputs(res))
      .then(res => {
        document.querySelector("#ownerOutput").innerHTML = res[0];
        document.querySelector("#speedOutput").innerHTML = res[1] + " mph";
        document.querySelector("#rightOutput").innerHTML = res[3] + " psi";
        document.querySelector("#leftOutput").innerHTML = res[4] + " psi";
        document.querySelector("#frontOutput").innerHTML = res[5] + " psi";
        document.querySelector("#backOutput").innerHTML = res[6] + " psi";
        document.querySelector("#crashedOutput").innerHTML = res[2];
      })
      .catch(error => console.log(error));
  }
  $(".dropbtn").on("change", onChange);
});
