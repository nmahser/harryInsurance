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
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "_speed",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_accelerometer",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_gyroscope",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_brakePressure",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_distanceFromVehicle",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "_streetName",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "_areaCode",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "_timeOfDay",
        type: "string"
      },
      {
        internalType: "string",
        name: "_weather",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "_crashed",
        type: "uint256"
      }
    ],
    name: "addCar",
    outputs: [
      {
        internalType: "uint256",
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
        internalType: "uint256",
        name: "_id",
        type: "uint256"
      }
    ],
    name: "getCarAccelerometer",
    outputs: [
      {
        internalType: "uint256",
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
        internalType: "uint256",
        name: "_id",
        type: "uint256"
      }
    ],
    name: "getCarAreaCode",
    outputs: [
      {
        internalType: "uint256",
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
        internalType: "uint256",
        name: "_id",
        type: "uint256"
      }
    ],
    name: "getCarBrakePressure",
    outputs: [
      {
        internalType: "uint256",
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
        internalType: "uint256",
        name: "_id",
        type: "uint256"
      }
    ],
    name: "getCarCrashed",
    outputs: [
      {
        internalType: "uint256",
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
        internalType: "uint256",
        name: "_id",
        type: "uint256"
      }
    ],
    name: "getCarDistanceFromVehicle",
    outputs: [
      {
        internalType: "uint256",
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
        internalType: "uint256",
        name: "_id",
        type: "uint256"
      }
    ],
    name: "getCarGyroscope",
    outputs: [
      {
        internalType: "uint256",
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
        internalType: "uint256",
        name: "_id",
        type: "uint256"
      }
    ],
    name: "getCarName",
    outputs: [
      {
        internalType: "string",
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
        internalType: "uint256",
        name: "_id",
        type: "uint256"
      }
    ],
    name: "getCarSpeed",
    outputs: [
      {
        internalType: "uint256",
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
        internalType: "uint256",
        name: "_id",
        type: "uint256"
      }
    ],
    name: "getCarStreetName",
    outputs: [
      {
        internalType: "string",
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
        internalType: "uint256",
        name: "_id",
        type: "uint256"
      }
    ],
    name: "getCarTimeOfDay",
    outputs: [
      {
        internalType: "string",
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
        internalType: "uint256",
        name: "_id",
        type: "uint256"
      }
    ],
    name: "getCarWeather",
    outputs: [
      {
        internalType: "string",
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
const address = "0xe6A5A85D1D46368A52e10d6f774453f2321527dd";
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
async function setAttributes(
  name,
  speed,
  accelerometer,
  gyroscope,
  brakePressure,
  distanceFromVehicle,
  streetName,
  areaCode,
  timeOfDay,
  weather,
  crashed
) {
  //Gas price to send the transaction
  let gasPrice = new BN(5) * 10 ** 9; //5 Gwei
  let gas = new BN(500000);
  return await contract.methods
    .addCar(
      name,
      speed,
      accelerometer,
      gyroscope,
      brakePressure,
      distanceFromVehicle,
      streetName,
      areaCode,
      timeOfDay,
      weather,
      crashed
    )
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
    const carAccelerometer = await contract.methods
      .getCarAccelerometer(number)
      .call();
    const carGyroscope = await contract.methods.getCarGyroscope(number).call();
    const carBrakePressure = await contract.methods
      .getCarBrakePressure(number)
      .call();
    const carDistanceFromVehicle = await contract.methods
      .getCarDistanceFromVehicle(number)
      .call();
    const carStreetName = await contract.methods
      .getCarStreetName(number)
      .call();
    const carAreaCode = await contract.methods.getCarAreaCode(number).call();
    const carTimeOfDay = await contract.methods.getCarTimeOfDay(number).call();
    const carWeather = await contract.methods.getCarWeather(number).call();
    const carCrashed = await contract.methods.getCarCrashed(number).call();

    const array = [
      carName,
      carSpeed,
      carAccelerometer,
      carBrakePressure,
      carGyroscope,
      carDistanceFromVehicle,
      carStreetName,
      carAreaCode,
      carTimeOfDay,
      carWeather,
      carCrashed
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

      /*
      let name = document.querySelector("#ownerInput").value;
      let speed = document.querySelector("#speedInput").value;
      let crashed = document.querySelector("#crashedInput").value;
      let right = document.querySelector("#rightInput").value;
      let left = document.querySelector("#leftInput").value;
      let front = document.querySelector("#frontInput").value;
      let back = document.querySelector("#backInput").value;*/
      let name = "Harry";
      let speed = 80;
      let accelerometer = 10;
      let gyroscope = 800;
      let brakePressure = 1;
      let distanceFromVehicle = 20;
      let streetName = "Market St";
      let areaCode = "11000";
      let timeOfDay = "21:00";
      let weather = "Cloudy";
      let crashed = 1;

      await setAttributes(
        name,
        speed,
        accelerometer,
        gyroscope,
        brakePressure,
        distanceFromVehicle,
        streetName,
        areaCode,
        timeOfDay,
        weather,
        crashed
      );
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
        document.querySelector("#accelerometer").innerHTML = res[2];
        document.querySelector("#gyroscope").innerHTML = res[4];
        document.querySelector("#brakePressure").innerHTML = res[3];
        document.querySelector("#distanceFromVehicle").innerHTML = res[5];
        document.querySelector("#streetName").innerHTML = res[6];
        document.querySelector("#areaCode").innerHTML = res[7];
        document.querySelector("#timeOfDay").innerHTML = res[8];
        document.querySelector("#weather").innerHTML = res[9];
        document.querySelector("#crashed").innerHTML = res[10];
      })
      .catch(error => console.log(error));
  }
  $(".dropbtn").on("click", onChange);
});
