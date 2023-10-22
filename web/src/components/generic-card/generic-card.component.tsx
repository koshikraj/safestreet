//@ts-nocheck

import { Card, Chip, Image, Group, Skeleton, Badge } from '@mantine/core'
import { Icon24Hours } from '@tabler/icons'
import './skeleton.css'
// import {
//   Image,
//   ImageComponentProps,
// } from "../primitives/image/image.component";
import { useCardStyles } from './generic-card.component.styles'

import Fingerprint from '../../assets/icons/fingerprint.png'
import Safe from '../../assets/icons/safe.png'
import Session from '../../assets/icons/session.png'
import Email from '../../assets/icons/mail.png'
import NFT from '../../assets/icons/ape.png'

export interface GenericCardProps {
  enabled?: boolean
  title?: string
  image?: string
  loading?: boolean
  onClick?: any
}

export const GenericCard: React.FC<GenericCardProps> = (props) => {
  const { enabled, width, title, loading = true, onClick, image } = props

  //const { classes } = useStyles()
  const { classes } = useCardStyles()
  return (
    // <Card className={classes.card} onClick={onClick} width={80}>
    //   {!loading && (
    //     <>
    //       <Image
    //         src={image ? image : Safe}
    //         width={60}
    //         className={classes.image}
    //       />
    //       <p className={classes.p}>{title}</p>
    //       {enabled && (
    //         <Chip checked color='green' variant='light' size='xs' radius='md'>
    //           Enabled
    //         </Chip>
    //       )}
    //     </>
    //   )}

    //   {loading && (
    //     <>
    //       <Group
    //         style={{
    //           width: '100%',
    //           display: 'flex',
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //         }}
    //       >
    //         <Skeleton height={120} mt={6} radius='lg' width='100%' />
    //       </Group>
    //       <Group
    //         style={{
    //           width: '100%',
    //           display: 'flex',
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //         }}
    //       >
    //         <Skeleton height={20} mt={6} radius='xl' width='100%' />
    //       </Group>
    //       <Group
    //         style={{
    //           width: '100%',
    //           display: 'flex',
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //         }}
    //       >
    //         <Skeleton height={20} mt={6} width='60%' />
    //       </Group>
    //     </>
    //   )}
    // </Card>

    <>
      {!loading && (
        <>
          <div className={classes.cardContainer} onClick={onClick}>
            <div className={classes.imageContainer}>
              <Image
                src={image ? image : Safe}
                width={40}
                height={40}
                className={classes.image}
              />
            </div>

            <div>
              <p className={classes.pluginName}>{title}</p>
              <p className={classes.description}>
                Description ewqsf dsfgdsgs sdloremf Lorem ipsum dolor sit amet,
                consectetur.
              </p>
            </div>

            <div className={classes.badge}>
              <Badge color='green'>Free</Badge>

              {enabled && (
                <Badge sx={{ marginLeft: '4px' }} color='green'>
                  Enabled
                </Badge>
              )}
            </div>
          </div>
        </>
      )}
      {loading && (
        <>
          <div className='cardContainer skeleton'>
            <div className='imageContainer skeleton'>
              <div className='image skeleton'></div>
            </div>

            <div>
              <p className='pluginName skeleton'></p>
              <p className='description skeleton'></p>
            </div>

            <div>
              <div className='badge skeleton'></div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
