import React, { useState } from "react";
import { fetchSkyIdAndEntityId, fetchFlightDetails } from "../api/flights";
import {
    Box,
    Button,
    TextField,
    Typography,
    MenuItem,
    FormControl,
    Select,
    Popover,
    Grid,
    IconButton,
    Divider,
    Card
  } from "@mui/material";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import InputAdornment from '@mui/material/InputAdornment';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const theme = createTheme({
    palette: {
      primary: {
        main: "#007FFF",
        dark: "#0066CC",
      },
    },
  });

export default function SearchBar(){
    return(
        <ThemeProvider theme={theme}>
            <Typography
            sx={(theme) => ({ 
            fontSize: "2rem", 
            display: "flex", 
            flexDirection: "row", 
            alignItems: "center", 
            justifyContent: "center", 
            height: "2rem", 
            [theme.breakpoints.up(720)]: {
            fontSize: "3.5rem",
            marginBottom: "1rem"
            },
            [theme.breakpoints.up(768)]: {
            marginBottom: "3rem"
            },
            })}
            variant="h6"
            >
                Flights
            </Typography>
            <Box>
                <FormControl>
                    <Select>
                        <MenuItem>
                            <SyncAltIcon />
                            Round trip                        
                        </MenuItem>
                        <MenuItem>
                            <TrendingFlatIcon />
                            One way
                        </MenuItem>
                    </Select>
                </FormControl>
                

            </Box>
        </ThemeProvider>
    )
}