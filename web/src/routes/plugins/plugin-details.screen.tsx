import {
  Box,
  Center,
  Container,
  Group,
  Loader,
  Modal,
  Text,
  Image,
  Paper,
  Stack,
  Button,
  TextInput,
  Divider,
  Alert,
  Skeleton,
  Rating,
  useMantineTheme,
  Avatar,
  Chip,
  Select,
} from '@mantine/core'
import { useStyles } from './plugin-details.screen.styles'
import usePluginStore from '../../store/plugin/plugin.store'
import {
  IconAlertCircle,
  IconAt,
  IconCheck,
  IconCopy,
  IconPlugConnected,
  IconCheckbox,
  IconWallet,
  IconSettings,
  IconPlaylistAdd,
  IconPlus,
  IconCross,
  IconMoneybag,
} from '@tabler/icons'
import { BackButton, ProgressStatus, Title } from '../../components'
import { forwardRef, useCallback, useEffect, useState } from 'react'
import { disablePlugin, enablePlugin } from '../../logic/plugins'
import { LoaderModal } from '../../components/modals/loader.component'
import { useHover } from '@mantine/hooks'
import Safe from '../../assets/icons/safe.png'

import { RoutePath } from '../../navigation'
import { useNavigate } from 'react-router-dom'
import { getProvider } from '../../logic/web3'
import { NetworkUtil } from '../../logic/networks'
import { PROTOCOL_CHAIN_ID } from '../../logic/constants'
import {
  accountPaymentInfo,
  fullfillePayment,
  loadPublishDetails,
  publishWithPayment,
  loadPublisher,
  withdrawFunds,
} from '../../logic/safestreet'
import { formatEther, parseEther } from 'ethers'

const tokenList: any = [
  {
    value: '0xb682DB693751b65430138aec47E09435D391f781',
    label: 'SUSD',
    image:
      'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/usd.svg',
    description: 'USD token',
  },
  {
    value: '0x0000000000000000000000000000000000000000',
    label: 'Ether',
    image:
      'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/matic.svg',
    description: 'Matic on Polygon chain',
  },
  {
    value: '0xb682DB693751b65430138aec47E09435D391f784',
    label: 'USDT',
    image:
      'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/usdt.svg',
    description: 'USDT on Polygon chain',
  },
  {
    value: '0xb682DB693751b65430138aec47E09435D391f782',
    label: 'DAI',
    image:
      'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/dai.svg',
    description: 'DAI on Polygon chain',
  },
]

export const PluginDetailsScreen = () => {
  const { classes } = useStyles()
  const { hovered, ref } = useHover()
  const theme = useMantineTheme()
  const navigate = useNavigate()

  const [attestModal, setAttestModal] = useState(false)

  const [settingsModal, setSettingsModal] = useState(false)
  const [publishDetails, setPublishDetails]: any = useState({})
  const [accountInfo, setAccountInfo]: any = useState({})

  const [paymentToken, setPaymentToken]: any = useState(tokenList[0].value)
  const [paymentAmount, setPaymentAmount]: any = useState(0)

  const [creating, setCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [enabling, setEnabling] = useState(false)

  const [chainId, setChainId]: any = useState(PROTOCOL_CHAIN_ID)

  console.log('asdsd')
  console.log(publishDetails)

  const { pluginDetails } = usePluginStore((state: any) => state)

  interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    image: string
    label: string
    description: string
  }

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, description, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={image} />

          <div>
            <Text size='sm'>{label}</Text>
            <Text size='xs'>{description}</Text>
          </div>
        </Group>
      </div>
    )
  )

  useEffect(() => {
    ;(async () => {
      if (!pluginDetails.address) {
        navigate(RoutePath.plugins)
      }

      try {
        const provider = await getProvider()
        const chainId = (await provider.getNetwork()).chainId
        setChainId(chainId)

        setPublishDetails(await loadPublishDetails(pluginDetails.address))
        setAccountInfo(await accountPaymentInfo(pluginDetails.address))
      } catch (e) {
        console.log(e)
      }
    })()
  }, [saving])

  const handleToggle = useCallback(async () => {
    console.log(pluginDetails)
    if (pluginDetails?.enabled === undefined) return
    setEnabling(true)
    try {
      if (pluginDetails.enabled) {
        await disablePlugin(pluginDetails.address)
      } else {
        await enablePlugin(
          pluginDetails.address,
          pluginDetails.metadata.requiresRootAccess
        )
      }
      setEnabling(false)
    } catch (e) {
      setEnabling(false)
      console.warn(e)
    }
  }, [pluginDetails])

  return (
    <Paper withBorder className={classes.settingsContainer}>
      <Container className={classes.formContainer}>
        {/* <Container className={classes.box}> */}
        <LoaderModal loading={creating} text={'Creating audit attestation'} />
        <LoaderModal loading={loading} text={'Attesting the Plugin'} />

        <Modal
          centered
          opened={settingsModal}
          onClose={() => setSettingsModal(false)}
          overlayProps={{
            color:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[9]
                : theme.colors.gray[2],
            opacity: 0.55,
            blur: 3,
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          withCloseButton={false}
          // overlayOpacity={0.5}
          size={600}
        >
          <Box sx={{ padding: '30px' }}>
            <Title> Plugin Settings</Title>

            <Paper
              // shadow='xl'
              withBorder
              radius='sm'
              p='xl'
              style={{
                marginTop: 30,
              }}
            >
              <Group>
                <Container
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',

                    // alignItems: "center",
                    marginLeft: '10px',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <Stack>
                    <Group>
                      <Select
                        sx={{ width: '100%' }}
                        label='Select the mode of payment'
                        size='md'
                        defaultValue={
                          publishDetails.token
                            ? publishDetails.token
                            : paymentToken
                        }
                        itemComponent={SelectItem}
                        data={tokenList}
                        onChange={(value) => setPaymentToken(value)}
                      />
                      <TextInput
                        sx={{ width: '100%' }}
                        defaultValue={
                          publishDetails.amount
                            ? formatEther(publishDetails.amount)
                            : 0
                        }
                        onChange={(event) => {
                          setPaymentAmount(event.target.value)
                        }}
                        placeholder='Amount'
                        label='Enter the payment amount'
                        size='md'
                      />
                    </Group>
                  </Stack>

                  <Text mt={'lg'}> Plugin subscription details</Text>

                  <Group noWrap>
                    <Avatar
                      src={
                        tokenList.filter((tokenInfo: any) => {
                          return tokenInfo.value == publishDetails.token
                        })[0]?.image
                      }
                    />

                    <div>
                      <Text size='lg'>{`${formatEther(
                        publishDetails.amount ? publishDetails.amount : 0
                      )}  ${
                        tokenList.filter((tokenInfo: any) => {
                          return tokenInfo.value == publishDetails.token
                        })[0]?.label
                      }`}</Text>
                      <Text size='xs'>
                        {
                          tokenList.filter((tokenInfo: any) => {
                            return tokenInfo.value == publishDetails.token
                          })[0]?.description
                        }
                      </Text>
                    </div>
                  </Group>

                         
                  <Text mt={'lg'}> Total module earnings</Text>
                  <Group> 
                  <Group noWrap>
                    <div>
                      <Text size='lg'>{`${formatEther(
                        publishDetails.earnings ? publishDetails.earnings : 0
                      )}  ${
                        tokenList.filter((tokenInfo: any) => {
                          return tokenInfo.value == publishDetails.token
                        })[0]?.label
                      }`}</Text>
                      <Text size='xs'>
                        {
                          tokenList.filter((tokenInfo: any) => {
                            return tokenInfo.value == publishDetails.token
                          })[0]?.description
                        }
                      </Text>
                    </div>
                  </Group>

                  <Button
                onClick={async () => {
                  await withdrawFunds(pluginDetails.address)
                }}
                leftIcon={<IconSettings />}
                color={'gray'}
                variant={'outline'}
              >
                Withdraw Earnings
              </Button>
              </Group>

                  {!publishDetails && (
                    <Group
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Skeleton height={30} mt={6} radius='xl' width='100%' />
                    </Group>
                  )}
                  <Container
                    sx={{
                      marginTop: '10px',
                      justifyContent: 'center',
                    }}
                  ></Container>
                  <Button
                    // className={classes.button}
                    variant='filled'
                    color='green'
                    leftIcon={<IconCheckbox />}
                    loading={saving}
                    onClick={async () => {
                      setSaving(true)
                      await publishWithPayment(
                        pluginDetails.address,
                        paymentToken,
                        paymentAmount
                      )
                      setSaving(false)
                      setSettingsModal(false)
                    }}
                    sx={{
                      display: 'flex',
                      // flexDirection: 'column',

                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '30px',
                    }}
                  >
                    Save Settings
                  </Button>           
                </Container>
              </Group>
            </Paper>
          </Box>
        </Modal>
        <Modal
          centered
          opened={attestModal}
          onClose={() => setAttestModal(false)}
          overlayProps={{
            color:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[9]
                : theme.colors.gray[2],
            opacity: 0.55,
            blur: 3,
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          withCloseButton={false}
          // overlayOpacity={0.5}
          size={600}
        >
          <Box sx={{ padding: '30px' }}>
            <Title> Plugin susbscription details</Title>

            <Paper
              shadow='xl'
              withBorder
              radius='md'
              p='xl'
              style={{
                marginTop: 30,
              }}
            >
              <Group>
                <Container
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',

                    // alignItems: "center",
                    marginLeft: '10px',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <Text mt={'lg'}> Comirm the below payment details</Text>

                  <Group noWrap>
                    <Avatar
                      src={
                        tokenList.filter((tokenInfo: any) => {
                          return tokenInfo.value == publishDetails.token
                        })[0]?.image
                      }
                    />

                    <div>
                      <Text size='lg'>{`${formatEther(
                        publishDetails.amount ? publishDetails.amount : 0
                      )}  ${
                        tokenList.filter((tokenInfo: any) => {
                          return tokenInfo.value == publishDetails.token
                        })[0]?.label
                      }`}</Text>
                      <Text size='xs'>
                        {
                          tokenList.filter((tokenInfo: any) => {
                            return tokenInfo.value == publishDetails.token
                          })[0]?.description
                        }
                      </Text>
                    </div>
                  </Group>

                  <Button
                    // className={classes.button}
                    variant='default'
                    leftIcon={<IconCheckbox />}
                    onClick={async () => {
                      try {
                        await fullfillePayment(
                          pluginDetails.address,
                          publishDetails.token,
                          publishDetails.amount
                        )
                      } catch (e) {
                        console.warn(e)
                      }
                    }}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',

                      // alignItems: "center",
                      justifyContent: 'center',
                      marginTop: '30px',
                    }}
                  >
                    Confirm Payment
                  </Button>
                </Container>
              </Group>
            </Paper>
          </Box>
        </Modal>
        {/* <Paper className={classes.formContainer} withBorder> */}
        {/* <BackButton label="Back to Previous" onClick={backButtonHandler} /> */}
        <Group mb={30}>
          <h2 style={{ color: '#21293c', fontSize: '24px', fontWeight: 600 }}>
            Plugin Details
          </h2>
        </Group>

        <Paper
          // shadow='xl'
          withBorder
          radius='sm'
          p='xl'
          style={{
            marginTop: '-20px',
          }}
        >
          <Stack>
            <Group>
              <Image
                src={
                  pluginDetails.metadata?.iconUrl
                    ? pluginDetails.metadata?.iconUrl
                    : Safe
                }
                width={60}
              />
              <Stack>
                <Text size='md' weight={600} sx={{ color: '#21293c' }}>
                  {pluginDetails.metadata?.name}
                </Text>{' '}
                <Text
                  size='sm'
                  weight={500}
                  sx={{ marginTop: '-12px', color: '#4b587c' }}
                >
                  ⚙️ Version: {pluginDetails.metadata?.version}
                </Text>{' '}
              </Stack>
            </Group>
            <Group>
              <Button
                onClick={() => {
                  handleToggle()
                }}
                leftIcon={<IconPlugConnected />}
                loading={enabling}
                color={pluginDetails.enabled ? 'red' : 'dark'}
                variant={pluginDetails.enabled ? 'outline' : 'filled'}
                style={{
                  background: pluginDetails.enabled ? '' : '#81af6f',
                }}
              >
                {pluginDetails.enabled ? 'Disable Plugin' : 'Enable Plugin'}
              </Button>

              <Button
                onClick={async () => {
                  setSettingsModal(true)
                }}
                leftIcon={<IconSettings />}
                color={'gray'}
                variant={'outline'}
              >
                Settings
              </Button>
            </Group>
          </Stack>
        </Paper>

        <Paper
          // shadow='xl'
          withBorder
          radius='sm'
          p='xl'
          style={{
            marginTop: 30,
          }}
        >
          <Stack>
            {!publishDetails.publisher ? (
              <>
                <Group
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Skeleton height={80} mt={6} radius='lg' width='100%' />
                </Group>

                <Group
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Skeleton height={20} mt={6} radius='xl' width='100%' />
                </Group>
              </>
            ) : (
              <>
                {publishDetails.amount && (
                  <>
                    <Group sx={{ justifyContent: 'space-between' }}>
                      <Text size='md' weight={600}>
                        Plugin Subscription 💲
                      </Text>{' '}
                    </Group>

                    {!accountInfo.fullfilled && (
                      <>
                        <Paper>
                          <Alert
                            ref={ref}
                            icon={<IconAlertCircle size='10rem' />}
                            title='Paid plugin'
                            color='yellow'
                          >
                            This is a paid plugin. Make a payment to enable this
                            on your Safe Account.
                          </Alert>
                        </Paper>

                        <Button
                          // className={classes.button}
                          variant='default'
                          leftIcon={<IconCheck />}
                          onClick={() => {
                            setAttestModal(true)
                          }}
                        >
                          Subscribe to Plugin
                        </Button>
                      </>
                    )}

                    {accountInfo.fullfilled && (
                      <Paper>
                        <Alert
                          icon={<IconCheck size='10rem' />}
                          title='Plugin subscribed'
                          color='green'
                        >
                          You are subscribed. Enable the plugin now to use on
                          your Safe Account.
                        </Alert>
                      </Paper>
                    )}
                  </>
                )}
                <Text
                  style={{
                    marginTop: 20,
                  }}
                  size='md'
                  weight={600}
                >
                  Published by
                </Text>{' '}
                <Divider />
                <Group>
                  <Avatar
                    size={60}
                    src={loadPublisher(pluginDetails.publisher)?.logo}
                    alt='attester image'
                  />
                  <Stack>
                    <Text className={classes.link} size='md' weight={600}>
                      {loadPublisher(pluginDetails.publisher)?.name}
                    </Text>

                    <Text
                      className={classes.link}
                      size='sm'
                      opacity={0.65}
                    ></Text>
                  </Stack>
                </Group>
                <Divider />
                <Group></Group>
              </>
            )}
          </Stack>
        </Paper>
      </Container>
    </Paper>
  )
}
