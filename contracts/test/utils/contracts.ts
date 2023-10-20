import { Addressable, BaseContract } from "ethers";
import {
    BasePlugin,
    RecoveryWithDelayPlugin,
    RelayPlugin,
    TestSafeProtocolRegistryUnrestricted,
    WhitelistPlugin,
    SafeProtocolRegistryWrapper,
    SafeStreetWrapper,
} from "../../typechain-types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getProtocolRegistryAddress, getSafeStreetAddress } from "../../src/utils/protocol";

export const getInstance = async <T extends BaseContract>(
    hre: HardhatRuntimeEnvironment,
    name: string,
    address: string | Addressable,
): Promise<T> => {
    // TODO: this typecasting should be refactored
    return (await hre.ethers.getContractAt(name, address)) as unknown as T;
};

export const getSingleton = async <T extends BaseContract>(hre: HardhatRuntimeEnvironment, name: string): Promise<T> => {
    const deployment = await hre.deployments.get(name);
    return getInstance<T>(hre, name, deployment.address);
};

export const getPlugin = (hre: HardhatRuntimeEnvironment, address: string) => getInstance<BasePlugin>(hre, "BasePlugin", address);
export const getRelayPlugin = (hre: HardhatRuntimeEnvironment) => getSingleton<RelayPlugin>(hre, "RelayPlugin");
export const getRegistry = async (hre: HardhatRuntimeEnvironment) =>
    getInstance<SafeProtocolRegistryWrapper>(hre, "SafeProtocolRegistryWrapper", await getProtocolRegistryAddress(hre));
export const getSafeStreet = async (hre: HardhatRuntimeEnvironment) =>
    getInstance<SafeStreetWrapper>(hre, "SafeStreetWrapper", await getSafeStreetAddress(hre));
export const getWhiteListPlugin = async (hre: HardhatRuntimeEnvironment) => getSingleton<WhitelistPlugin>(hre, "WhitelistPlugin");
export const getRecoveryWithDelayPlugin = async (hre: HardhatRuntimeEnvironment) =>
    getSingleton<RecoveryWithDelayPlugin>(hre, "RecoveryWithDelayPlugin");
