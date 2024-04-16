import {
  Container,
  Typography,
  Link,
  Stack,
  Box,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid"
import Image from "next/image";
import slider from "../helper/slider.json"
import Carousel from 'react-material-ui-carousel'
import LoadingPage from "../components/loading";
import * as Palette from "../constants/palette";
import { useRouter } from "next/router.js";
import { useSession } from "next-auth/react";
import MobileLoginPage from "../components/login_components/mobile_page";
import GoogleSingInButton from "../components/google_sign_in.js/google_sign_in";

function Item({item})
{
    return(
        <img src={item.image} alt={item.title}style={{width: "100%", display: "block"}} />
    );
}

const styles = {
  containerImg: {
    backgroundColor: Palette.primary,
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${"../images/Fondo.svg"})`,
    backgroundSize: "100%",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default function ColumnsGrid() {
  const isMobileScreen = useMediaQuery("(max-width: 1000px)");
  const isMobileScreenH = useMediaQuery("(max-height: 600px)");
  const router = useRouter();
  const { data, status } = useSession();

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (status === "authenticated") {
    router.push({
      pathname: "/dashboard",
    });

    

    return <LoadingPage />;;
  }

  return (
    <>
      {isMobileScreen || isMobileScreenH ? (
        <MobileLoginPage />
      ) : (
        <Box sx={{ flexGrow: 1, height:"100vh", width: "100vw" }}>
          <Grid container spacing={0} columns={16} >
            <Grid item xs={8} sx={{height: "100vh",width: "100%",}}>
              <Container>
                <Stack
                  justifyContent="center"
                  textAlign="center"
                  display="block"
                  flex="1"
                  sx={{
                    backgroundColor: "white",
                  }}
                >
                  <Container sx={{marginTop: "15%"}}>
                    <Image
                      src={{
                        src: "/images/gnerd_logo.png",
                        width: "280",
                        height: "115",
                      }}
                      alt="gnerd_logo.png"
                    />
                  </Container>
                  <Typography
                    paddingTop="10%"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                  >Bienvenido de Nuevo</Typography>
                  <Typography
                    variant="subtitle1"
                    color={Palette.darkGrey}
                    paddingTop="4%"
                  >Conéctate con tu cuenta Google para ingresar.</Typography>
                  <GoogleSingInButton/>
                  <Typography
                    variant="subtitle1"
                    color={Palette.darkGrey}
                    paddingTop="10%"
                  >Sé más eficiente con herramientas de productividad empresarial y 
                  colaboración.
                  </Typography >
                  <Typography variant="subtitle2" paddingTop="2%"></Typography>
                  <Link href="https://www.gnerd.mx/" fontWeight="bold" >
                    Conócenos y aumenta tu rendimiento.
                  </Link>
                </Stack>
              </Container>
            </Grid>
            <Grid item xs={8}
              style={styles.containerImg}
            >
              <Carousel
                sx={{backgroundColor: "transparent", width: "100%"}}
                indicatorIconButtonProps={{
                  style: {
                    padding: '10px',
                  }
                }}
                activeIndicatorIconButtonProps={{
                  style: {
                    color: 'white'
                  }
                }}
                indicatorContainerProps={{
                  style: {
                    marginTop: "-25%"
                    }
                }}
                navButtonsAlwaysInvisible={true}
                stopAutoPlayOnHover={false}
                interval={"5000"}
              >
                {
                  slider.map( item => <Item key={item.id} item={item} /> )
                }
              </Carousel>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}