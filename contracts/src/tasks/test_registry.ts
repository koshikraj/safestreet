import "hardhat-deploy";
import "@nomicfoundation/hardhat-ethers";
import { task } from "hardhat/config";
import { getPlugin, getRegistry, getRelayPlugin, getRecoveryWithDelayPlugin, getSafeStreet, getWhiteListPlugin } from "../../test/utils/contracts";
import { MODULE_TYPE_PLUGIN } from "../utils/constants";
import { loadPluginMetadata } from "../utils/metadata";

task("register-plugin", "Registers the sample Plugin in the Safe{Core} test register")
    .setAction(async (_, hre) => {
        const registry = await getRegistry(hre)
        const safeStreet = await getSafeStreet(hre)
        const plugin = await getRelayPlugin(hre)
        await registry.publishModule(await plugin.getAddress(), MODULE_TYPE_PLUGIN, '0xd5B5Ff46dEB4baA8a096DD0267C3b81Bda65e943', await safeStreet.getAddress())
        console.log("Registered Plugin registry")
    });

task("list-plugins", "List available Plugins in the Safe{Core} test register")
    .setAction(async (_, hre) => {
        const registry = await getRegistry(hre)
        
        const events = await registry.queryFilter(registry.filters.ModulePublished)
        for (const event of events) {
            const plugin = await getPlugin(hre, event.args.module)
            const metadata = await loadPluginMetadata(hre, plugin)
            console.log(event.args.module, metadata)
        }
    });

export { }