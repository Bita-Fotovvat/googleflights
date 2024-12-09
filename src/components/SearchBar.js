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
    const [tripType, setTripType] = useState(10);
    const [tripClass, setTripClass] = useState("economy");
    const [counts, setCounts] = useState({
        adults: 1,
        children: 0,
        infantsSeat: 0,
        infantsLap: 0,
      });
      const [anchorEl, setAnchorEl] = useState(null);
      const [origin, setOrigin] = useState("");

      const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const handleIncrement = (category) => {
        setCounts((prev) => ({ ...prev, [category]: prev[category] + 1 }));
      };
    
      const handleDecrement = (category) => {
        setCounts((prev) => ({
          ...prev,
          [category]: Math.max(0, prev[category] - 1),
        }));
      };
      const summary = counts.adults + counts.children + counts.infantsSeat + counts.infantsLap;

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
                <FormControl variant="standard">
                    <Select
                    value={tripType}
                    onChange={(event)=> setTripType(event.target.value)}
                    disableUnderline
                    >
                        <MenuItem value={10}>
                            <SyncAltIcon />
                            Round trip                        
                        </MenuItem>
                        <MenuItem value={20}>
                            <TrendingFlatIcon />
                            One way
                        </MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="standard">
                    <Select
                    value={summary} 
                    onClick={handleOpen} 
                    readOnly
                    disableUnderline
                    >
                        <MenuItem  value={summary}>
                            <PersonOutlineIcon />
                            {summary}
                        </MenuItem>
                    </Select>
                </FormControl>
                <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                    <Box padding={2}>
                        {["adults", "children", "infantsSeat", "infantsLap"].map((category) => (
                        <React.Fragment key={category}>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item xs={6}>
                                    <Typography>
                                        {category.charAt(0).toUpperCase() +
                                        category.slice(1).replace(/([A-Z])/g, " $1")}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <IconButton onClick={() => handleDecrement(category)}>
                                        <RemoveIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>{counts[category]}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <IconButton onClick={() => handleIncrement(category)}>
                                        <AddIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Divider />
                        </React.Fragment>
                        ))}
                        <Button 
                        onClick={handleClose} 
                        fullWidth variant="contained" 
                        style={{ marginTop: 10 }}
                        >
                        Done
                        </Button>
                    </Box>
                </Popover>

                <FormControl
                variant="standard">
                    <Select
                    value={tripClass}
                    onChange={(e) => setTripClass(e.target.value)}
                    sx={{
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                      }}
                    disableUnderline
                    >
                        <MenuItem value={"economy"}>Economy</MenuItem>
                        <MenuItem value={"premium_economy"}>Premium Economy</MenuItem>
                        <MenuItem value={"business"}>Business</MenuItem>
                        <MenuItem value={"first"}>First</MenuItem>
                    </Select>

                </FormControl>


                <Box>
                    <Box>
                        <TextField
                        placeholder="Where from?"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PanoramaFishEyeIcon sx={{ color: "gray", width: "0.9rem" }} />
                              </InputAdornment>
                            )
                            }}
                        >
                        </TextField>
                    </Box>
                </Box>
                

            </Box>
        </ThemeProvider>
    )
}