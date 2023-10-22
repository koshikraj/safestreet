import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/cover.svg'
import logofooter from '../../assets/icons/cover-footer.svg'
import './Home.css';
import { Container, Image, Paper, Group, Button} from "@mantine/core";
import { useStyles } from "./home.screen.styles";
import { RoutePath } from '../../navigation';

function Home() {

  const { classes } = useStyles();
  const navigate = useNavigate()

  return (

    <Container>
    <Container className={classes.voucherScreenContainer}>
      <Container sx={{ padding: 0, marginTop: "150px", display: "flex", alignItems: "center",  justifyContent: "center"}}>
      <Paper className={classes.settingsContainer} shadow="xl"  radius="md" p="xl" style={{
                    marginTop: 30, 
                    // width: 700
                  }}>
      <div style={{ padding: 0,  display: "flex",  justifyContent: "center"}}>
       <img className={classes.heroImage} src={logo} />
          </div>
        <div style={{ paddingLeft: 80,  paddingRight: 80,  display: "flex",  justifyContent: "center"}}>
        <p className={classes.p}>Safe Developer Hub to monetize their published <b>modules</b></p> 
      </div>
      
      <div style={{ padding: 0,  display: "flex",  justifyContent: "center", marginBottom: "20px"}}>
       <img className={classes.heroImage} src={logofooter} />
          </div>
      <div style={{ padding: 20,  display: "flex",  justifyContent: "center"}}>
        
      <Group >
      <Button
                onClick={() => { navigate(RoutePath.plugins) }}
                size="lg"
                radius="md"
                color={ "#20283D" }
                variant={ "filled"  }
                style={{
                  backgroundColor: "#20283D"
                }}
              >
                Get Started
              </Button>
              <Button
                onClick={() => { window.open("https://app.safe.global/share/safe-app?appUrl=https://safestreet.xyz&chain=matic") }}
                size="lg"
                radius="md"
                color={ "gray" }
                variant={ "outline"  }
              >
               {`Try On Safe {Wallet}`}
              </Button>
              </Group>
      </div>
      
       </Paper>
      </Container>
      <div className={classes.actionsContainer}>

      </div>

    </Container>
  </Container>

  );
}

export default Home;
