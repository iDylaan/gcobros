import {
    Container,
    Typography,
    Stack,
    Box,
    useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid"
import { getAdminData } from "../../helper/jwt.js";
import Image from "next/image";
import slider from "../../helper/slider.json"
import Carousel from 'react-material-ui-carousel'
import LoadingPage from "../../components/loading";
import * as Palette from "../../constants/palette";
import { useRouter } from "next/router.js";
import MobileAdminLoginPage from "../../components/login_components/mobile_admin_page";
import AdminLoginForm from "../../components/login_components/admin_form";

function Item({ item }) {
    return (
        <img src={item.image} alt={item.title} style={{ width: "100%", display: "block" }} />
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

    useEffect(() => {
        const userData = getAdminData();
        if (userData) { admin() }
    }, []);

    function admin() {
        router.push("/admin");
    }

    return (
        <>
            {isMobileScreen || isMobileScreenH ? (
                <MobileAdminLoginPage />
            ) : (
                <Box sx={{ flexGrow: 1, height: "100vh", width: "100vw" }}>
                    <Grid container spacing={0} columns={16} >
                        <Grid item xs={8} sx={{ height: "100vh", width: "100%", }}>
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
                                    <Container sx={{ marginTop: "15%" }}>
                                        <Image
                                            src={{
                                                src: "/images/gnerd_logo.png",
                                                width: "280",
                                                height: "115",
                                            }}
                                            alt="gnerd_logo.png"
                                        />
                                        <Typography
                                            fontSize="clamp(1.3em, 1.3em, 1.3em)"
                                            color="#4285F4"
                                            marginTop='-40px'
                                            marginLeft='180px'
                                            fontWeight='bold'
                                        >Admin
                                        </Typography>
                                    </Container>
                                    <Typography
                                        paddingTop="10%"
                                        fontSize="clamp(1rem, 2rem, 2.25rem)"
                                    >Bienvenido de Nuevo</Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color={Palette.darkGrey}
                                    >Ingresa con tus credenciales</Typography>

                                    <AdminLoginForm />
                                </Stack>
                            </Container>
                        </Grid>
                        <Grid item xs={8}
                            style={styles.containerImg}
                        >
                            <Carousel
                                sx={{ backgroundColor: "transparent", width: "100%" }}
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
                                    slider.map(item => <Item key={item.id} item={item} />)
                                }
                            </Carousel>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </>
    );
}