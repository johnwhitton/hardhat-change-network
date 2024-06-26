"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const construction_1 = require("hardhat/internal/core/providers/construction");
// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
require("./type-extensions");
config_1.extendEnvironment((hre) => {
    // We add a field to the Hardhat Runtime Environment here.
    // We use lazyObject to avoid initializing things until they are actually
    // needed.
    const providers = {};
    hre.getProvider = function getProvider(name) {
        if (!providers[name]) {
            providers[name] = construction_1.createProvider(name, this.config.networks[name], this.config.paths, this.artifacts);
        }
        return providers[name];
    };
    hre.changeNetwork = function changeNetwork(newNetwork) {
        if (!this.config.networks[newNetwork]) {
            throw new Error(`changeNetwork: Couldn't find network '${newNetwork}'`);
        }
        if (!providers[this.network.name]) {
            providers[this.network.name] = this.network.provider;
        }
        this.network.name = newNetwork;
        this.network.config = this.config.networks[newNetwork];
        this.network.provider = this.getProvider(newNetwork);
        if (this.ethers) {
            const { EthersProviderWrapper, } = require("@nomiclabs/hardhat-ethers/internal/ethers-provider-wrapper");
            this.ethers.provider = new EthersProviderWrapper(this.network.provider);
        }
    };
});
//# sourceMappingURL=index.js.map