require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/cH-zU-zcbduVAlP2j9GTtUxG62cY_6XD",
      accounts: [
        "1b6e44d3e2b0167e6557e2c975fa9cf7545a1955cabb0aa02a5bb2d0c9bbb612",
      ],
    },
  },
};
