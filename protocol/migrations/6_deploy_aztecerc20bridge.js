/* global artifacts */

const { constants: { ERC20_SCALING_FACTOR, t2 } } = require('@aztec/dev-utils');
const { isUndefined } = require('lodash');

const AZTECInterface = artifacts.require('./AZTECInterface.sol');
const AZTECERC20Bridge = artifacts.require('./AZTECERC20Bridge.sol');
const ERC20Mintable = artifacts.require('./ERC20Mintable.sol');

module.exports = (deployer) => {
    if (isUndefined(ERC20Mintable) || isUndefined(ERC20Mintable.address)) {
        console.log('Please deploy the ERC20Mintable contract first');
        process.exit(1);
    }

    new Promise(() => {
        deployer.deploy(AZTECInterface);
        deployer.link(AZTECInterface, AZTECERC20Bridge);
        const erc20MintableAddress = ERC20Mintable.address;
        console.log(erc20MintableAddress);
        return deployer.deploy(AZTECERC20Bridge, t2, erc20MintableAddress, ERC20_SCALING_FACTOR).then(async (aztecerc20bridge) => {
            console.log('Successfully deployed!');
        });
    });
};
