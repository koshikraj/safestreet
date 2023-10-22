# 💲 SafeStreet

**Safe Developer Hub** to monetize their published **modules**


SafeStreet extends the `SafeProtocolManager` `SafeProtocolRegistry` from [Safe{Core} Protocol](https://github.com/5afe/safe-core-protocol). The Marketplace app is built with the template from [Safe{Core} Protocol Demo](https://github.com/5afe/safe-core-protocol-demo).


## Links:

- [Web App](https://safestreet.xyz)

- Try Safe App
    - [Polygon Mainnet](https://app.safe.global/share/safe-app?appUrl=https://safestreet.xyz&chain=matic)
    - [Goerli Testnet](https://app.safe.global/share/safe-app?appUrl=https://safestreet.xyz&chain=gor)


## Deployments

- SafeStreet Wrapper Registry  
  - [Polygon Mainnet](https://polygonscan.com/address/0xaB4C8586825886De2848E7ECd578550C43FD41c7#code)
  - [Goerli Testnet](https://goerli.etherscan.io/address/0xaB4C8586825886De2848E7ECd578550C43FD41c7#code)

- SafeStreet Token (To test subscription with token) 
    - [Polygon Mainnet](https://polygonscan.com/address/0xb682DB693751b65430138aec47E09435D391f781#code)
    - [Goerli Testnet](https://goerli.etherscan.io/address/0xb682DB693751b65430138aec47E09435D391f781#code)

## Structure

- [Extended Safe Core Protocol (Sub module)](https://github.com/koshikraj/safe-core-protocol/) Extended Core Protocol for SafeStreet
- [Contracts](./contracts/) contains samaple plugin contracts
- [Web App](./web/) contains plugin market place app


## Quick start

### Clone repo recursively

```
git clone --recurse-submodules https://github.com/koshikraj/safestreet
```

### Install dependencies and run

### 

```
cd web
yarn install
yarn start
```