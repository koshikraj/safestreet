export const SENTINEL_MODULES = "0x0000000000000000000000000000000000000001";

export const PLUGIN_PERMISSION_NONE = 0n;
export const PLUGIN_PERMISSION_EXECUTE_CALL = 1n;
export const PLUGIN_PERMISSION_CALL_TO_SELF = 2n;
export const PLUGIN_PERMISSION_DELEGATE_CALL = 4n;

// Module types
export const MODULE_TYPE_PLUGIN = 1n;
export const MODULE_TYPE_FUNCTION_HANDLER = 2n;
export const MODULE_TYPE_HOOKS = 4n;


export enum ExecutionType {
    MultiSignature,
    Module,
}
