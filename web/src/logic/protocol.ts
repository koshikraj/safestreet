import { Interface, ethers, Signer } from "ethers"
import protocolDeployments from "@safe-global/safe-core-protocol"
import { getProvider, getJsonRpcProvider } from "./web3"
import { PROTOCOL_CHAIN_ID } from "./constants";

// NetworkUtil.getNetworkById()

const Metadata_PROVIDER_ABI = [
    "function retrieveMetadata(bytes32 metadataHash) external view returns (bytes metadata)"
]

const PLUGIN_ABI = [
    "function metadataHash() public view returns (bytes32 metadataHash)",
    "function metadataProvider() external view returns (uint256 providerType, bytes location)"
]

export const getManager = async() => {
    const provider = await getProvider()
    const chainId =  (await provider.getNetwork()).chainId.toString()

    const registryInfo = protocolDeployments[chainId as keyof typeof protocolDeployments][0].contracts.SafeProtocolManagerWrapper;
    console.log(registryInfo)
    return new ethers.Contract(
        registryInfo.address,
        registryInfo.abi,
        provider
    )
}

export const getRegistry = async(signer?: Signer) => {

    const provider = await getProvider()
    // Updating the provider RPC if it's from the Safe App.
    const chainId =  (await provider.getNetwork()).chainId.toString()
    const bProvider = await getJsonRpcProvider(chainId)

    const registryInfo = protocolDeployments[chainId as keyof typeof protocolDeployments][0].contracts.SafeProtocolRegistryWrapper;

    return new ethers.Contract(
        registryInfo.address,
        registryInfo.abi,
        signer ? signer : bProvider
    )
}

export const getSafeStreet = async(signer?: Signer) => {

    const provider = await getProvider()
    // Updating the provider RPC if it's from the Safe App.
    const chainId =  (await provider.getNetwork()).chainId.toString()
    const bProvider = await getJsonRpcProvider(chainId)

    const safeStreetInfo = protocolDeployments[chainId as keyof typeof protocolDeployments][0].contracts.SafeStreetWrapper;


    return new ethers.Contract(
        safeStreetInfo.address,
        safeStreetInfo.abi,
        signer ? signer : bProvider
    )
}

export const getSafeStreetToken = async(signer?: Signer) => {

    const provider = await getProvider()
    // Updating the provider RPC if it's from the Safe App.
    const chainId =  (await provider.getNetwork()).chainId.toString()
    const bProvider = await getJsonRpcProvider(chainId)

    const safeStreetToken = protocolDeployments[chainId as keyof typeof protocolDeployments][0].contracts.SafeStreetToken;

    return new ethers.Contract(
        safeStreetToken.address,
        safeStreetToken.abi,
        signer ? signer : bProvider
    )
}

export const getPlugin = async(pluginAddress: string) => {
    const provider = await getProvider()
    return new ethers.Contract(
        pluginAddress,
        PLUGIN_ABI,
        provider
    )
}

export const getMetadataProvider = async(providerAddress: string) => {
    const provider = await getProvider()
    return new ethers.Contract(
        providerAddress,
        Metadata_PROVIDER_ABI,
        provider
    )
}