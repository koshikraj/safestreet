import {
  ZeroAddress,
  EventLog,
  BigNumberish,
  ethers,
  formatEther,
} from 'ethers'
import { BaseTransaction } from '@safe-global/safe-apps-sdk'
import { PluginMetadata, loadPluginMetadata } from './metadata'
import {
  getManager,
  getPlugin,
  getRegistry,
  getSafeStreet,
  getSafeStreetToken,
} from './protocol'
import { getSafeInfo, isConnectedToSafe, submitTxs } from './safeapp'
import { getJsonRpcProvider, getProvider } from './web3'

import Safe from '../assets/icons/safe.png'
import OZ from '../assets/icons/oz.png'

const PUBLISHER_INFO = {
  '0xaA498424C846c44e2029E1835f9549d86d7C5E44': {
    logo: '',
    link: 'https://twitter.com/VitalikButerin',
    name: 'Vitalik Buterin',
    trust: 9,
  },
  '0x958543756A4c7AC6fB361f0efBfeCD98E4D297Db': {
    logo: OZ,
    link: 'https://www.openzeppelin.com',
    name: 'OpenZeppelin',
    trust: 9,
  },
  '0xd5B5Ff46dEB4baA8a096DD0267C3b81Bda65e943': {
    logo: Safe,
    link: 'https://safe.global',
    name: 'Safe Ecosystem',
    trust: 10,
  },
}

export const loadPublisher = (address: string) => {
  return Object(PUBLISHER_INFO)[address]
}

export const loadPublishDetails = async (plugin: string): Promise<[]> => {
  const safeStreet = await getSafeStreet()

  console.log('sdfsdf')
  console.log(safeStreet)

  return await safeStreet.modulePublishList(plugin)
}

export const accountPaymentInfo = async (plugin: string): Promise<[]> => {
  const safeStreet = await getSafeStreet()

  const safeInfo = await getSafeInfo()

  return safeStreet.checkAccountPaymentInfo(plugin, safeInfo.safeAddress)
}

export const publishWithPayment = async (
  plugin: string,
  token: string,
  amount: string
) => {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const safeStreet = await getSafeStreet(await provider.getSigner())
  const publishTx = await safeStreet.publishWithPayment(
    plugin,
    token,
    ethers.parseEther(amount)
  )

  await publishTx.wait()
}

export const withdrawFunds = async (plugin: string) => {

    const provider =  new ethers.BrowserProvider(window.ethereum)
    const safeStreet = await getSafeStreet(await provider.getSigner())
    const withdrawTx = await safeStreet.withdrawFunds(plugin)

    await withdrawTx.wait()

}

export const fullfillePayment = async (plugin: string, token: string, amount: string ) => {


  if (!(await isConnectedToSafe())) throw Error('Not connected to a Safe')
  const safeInfo = await getSafeInfo()
  const safeStreet = await getSafeStreet()
  const safeStreetToken = await getSafeStreetToken()
  const txs: BaseTransaction[] = []

  const tokenBalance = await safeStreetToken.balanceOf(safeInfo.safeAddress)
  const tokenAllowance = ethers.formatEther(
    await safeStreetToken.allowance(safeInfo.safeAddress, safeStreet)
  )

  console.log(tokenAllowance)

  if (token != ZeroAddress) {
    txs.push({
      to: await safeStreetToken.getAddress(),
      value: '0',
      data: (
        await safeStreetToken.approve.populateTransaction(
          await safeStreet.getAddress(),
          tokenBalance
        )
      ).data,
    })
  }

  txs.push({
    to: await safeStreet.getAddress(),
    value: token == ZeroAddress ? amount : '0',
    data: (
      await safeStreet.fullfillPayment.populateTransaction(
        plugin,
        safeInfo.safeAddress
      )
    ).data,
  })

  if (txs.length == 0) return
  await submitTxs(txs)
}
