declare namespace NodeJS {
    interface ProcessEnv {
        SEPOLIA_RPC_URL: string;
        PRIVATE_KEY: string
        MNEMNONIC: string
        ETHERSCAN_API_KEY: string
        COINMARKET_CAP_API_KEY: string
        METAMASK_PRIVATE_KEY: string
        CHAINLINK_VRF_SUBSCRIPTION_ID: string
    }
}