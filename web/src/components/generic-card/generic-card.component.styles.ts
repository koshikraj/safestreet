import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    justifyContent: 'center',
    border:
      theme.colorScheme === 'dark' ? '1px solid  #25262B' : '1px solid #DEE2E6',
    width: '200px',
    height: '200px',
    background: theme.colorScheme === 'dark' ? '#282927' : '#f1f1f1',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    borderRadius: '4px',
    color: theme.colorScheme === 'dark' ? '#A6A7AB' : theme.colors.gray[7],

    '&:hover': {
      cursor: 'pointer',
      borderColor: '#2ACB82',
      boxShadow: '0 0 5px #2ACB82',
    },
  },
  p: {
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '18px',
    textAlign: 'center',
    marginTop: '32px',
  },
  image: {
    marginTop: '20px',
  },
}))

export const useCardStyles = createStyles((theme) => ({
  cardContainer: {
    padding: '20px',
    border: ' 1px solid #d9e1ec',
    borderRadius: '4px',
    transition: 'all .3s ease',
    cursor: 'pointer',
    background: '#fff',
    maxWidth: '400px',
    '&:hover': {
      cursor: 'pointer',
      borderColor: '#2ACB82',
      // boxShadow: '0 0 5px #2ACB82',
    },
  },
  imageContainer: {
    // height: '68px',
    // width: '68px',
    border: '1px solid transparant',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',

    // boxShadow: 'rgba(128, 128, 128, 0.15) 0px 2px 4px 0px',
  },
  image: {
    // padding: '4px',
    height: '50px',
    width: '50px',
    display: 'block',
    alignSelf: 'center',
  },
  pluginName: {
    color: '#21293c',
    fontWeight: 600,
    fontSize: '16px',
    marginTop: '6px',
  },
  description: {
    color: '#4b587c',
    fontWeight: 400,
    lineHeight: '24px',
    fontSize: '14px',
    marginTop: '-14px',
  },
  metaContainer: {},
  // description: {},
  badge: {
    marginTop: '-5px',
  },
}))
