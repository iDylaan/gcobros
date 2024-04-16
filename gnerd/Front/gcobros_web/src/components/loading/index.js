import React from 'react'
import { Box, CircularProgress, Typography } from "@mui/material"
import ui from "./index.module.css"

export default function LoadingPage({ message }) {
  return (
    <Box className={ui.mainBox}>
        <Box className={ui.loadingBox}>
            <CircularProgress className={ui.circularProgress} size="3.25rem"/>
            <Typography className={ui.loadingText}>Cargando...</Typography>
        </Box>
    </Box>
  )
}
