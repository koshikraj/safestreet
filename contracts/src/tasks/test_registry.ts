import "hardhat-deploy";
import "@nomicfoundation/hardhat-ethers";
import { task } from "hardhat/config";
import { getPlugin, getRegistry, getRelayPlugin, getRecoveryWithDelayPlugin, getSafeStreet, getWhiteListPlugin } from "../../test/utils/contracts";
import { MODULE_TYPE_PLUGIN } from "../utils/constants";
import { loadPluginMetadata } from "../utils/metadata";

task("register-plugin", "Registers the sample Plugin in the Safe{Core} test register")
    .setAction(async (_, hre) => {
        const registry = await getRegistry(hre)
        console.log(await registry.getAddress())
        const safeStreet = await getSafeStreet(hre)
        const plugin = await getWhiteListPlugin(hre)
        console.log(await safeStreet.getAddress())
        await registry.publishModule(await plugin.getAddress(), MODULE_TYPE_PLUGIN, '0x958543756A4c7AC6fB361f0efBfeCD98E4D297Db', await safeStreet.getAddress())
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