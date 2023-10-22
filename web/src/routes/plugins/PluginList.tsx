import { useCallback, useEffect, useState } from 'react'
import { Button, Center, Container, Input, Select, Stack } from '@mantine/core'
import './Plugins.css'
import { loadPlugins } from '../../logic/plugins'
import { Plugin } from './Plugin'
import { useStyles } from './plugins.screen.styles'
import { GenericCard, Image, Title, VoucherCard } from '../../components'

const mockPlugins = ['1', '2']

function PluginList() {
  const { classes } = useStyles()
  const [showFlagged, setFilterFlagged] = useState<boolean>(false)
  const [plugins, setPlugins] = useState<any[]>([])
  const fetchData = useCallback(async () => {
    try {
      setPlugins([])
      setPlugins(await loadPlugins(!showFlagged))
    } catch (e) {
      console.warn(e)
    }
  }, [showFlagged])

  useEffect(() => {
    fetchData()
  }, [fetchData])
  return (
    // <div className="Plugins">
    //   {/* <span>
    //     <FormControlLabel control={
    //       <Checkbox checked={showFlagged} onChange={(_, checked) => setFilterFlagged(checked) } inputProps={{ 'aria-label': 'controlled' }} />
    //     } label="Show Flagged PlugIns" />
    //     <Button onClick={fetchData}>Reload</Button>
    //   </span> */}
    //   <div className='Plugins-list'>

    //   </div>
    // </div>
    <Container>
      <Container className={classes.voucherScreenContainer}>
        <Container
          sx={{
            padding: 0,
            // marginTop: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2 style={{ color: '#21293c', fontSize: '24px', fontWeight: '600' }}>
            Available Plugins
          </h2>
          <Button color='green' variant='filled'>
            Submit Plugin (Soon)
          </Button>
        </Container>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Input
            placeholder='Search Plugins'
            type='search'
            sx={{ width: '100%' }}
          />
          <div>
            <Select
              // label='Sort By'
              placeholder='Pick value'
              data={['By Owner', 'Free', 'Top Rated', 'Show All']}
              defaultValue='Show All'
              clearable
            />
          </div>
        </div>
        <div className={classes.actionsContainer}>
          {plugins.map((plugin) => (
            <Plugin address={plugin.module} publisher={plugin.publisher} />
          ))}
        
          {!plugins.length &&
            mockPlugins.map((plugin) => <Plugin address={plugin} publisher={''}/>)}


        </div>
      </Container>
    </Container>
  )
}

export default PluginList
