import FlightResults from "./FlightResults";
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
import SearchIcon from '@mui/icons-material/Search';
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
      const [destination, setDestination] = useState("");
      const [departureDate, setDepartureDate] = useState("");
      const [returnDate, setReturnDate] = useState("");
      const [flightDetails, setFlightDetails] = useState([]);

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

      const handleSearch = async () => {
        try {
          const originSkyIdAndEntityId = await fetchSkyIdAndEntityId(origin);
          const destinationSkyIdAndEntityId = await fetchSkyIdAndEntityId(destination);
    
          if (!originSkyIdAndEntityId || !destinationSkyIdAndEntityId) {
            console.error("SkyId(s) could not be retrieved. Aborting flight search.");
            return;
          }
    
          const flights = await fetchFlightDetails(
            originSkyIdAndEntityId,
            destinationSkyIdAndEntityId,
            tripClass,
            counts,
            departureDate,
            returnDate
          );
          setFlightDetails(flights);
        } catch (error) {
          console.error("Error in handleSearch:", error);
        }
      };

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


            <Box
            sx={(theme) => ({          
            boxShadow: "0px 3px 4px rgba(0, 0, 0, 0.2)",
            bgcolor: "white",
            width: "100%",
            borderRadius: 2,
            height:"13rem",
            [theme.breakpoints.up(768)]: {
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.3)",
                width: "95%",
                margin: "auto",
                height:"10rem",
            },
            })}
            >
                <FormControl 
                variant="standard"
                sx={{
                  margin: {xs:"0.6rem 0 0 0.5rem", sm:"0.25rem 0 0 2rem"},
                  minWidth: { xs: 99, sm: 120 },
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}>
                    <Select
                    value={tripType}
                    onChange={(event)=> setTripType(event.target.value)}
                    disableUnderline
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: { xs: "80px", sm: "100px", md: "150px" },
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                      }}
                    >
                        <MenuItem value={10}>
                            <SyncAltIcon style={{ marginRight: "8px", color: "grey" }}/>
                            Round trip                        
                        </MenuItem>
                        <MenuItem value={20}>
                            <TrendingFlatIcon style={{ marginRight: "8px", color: "grey" }}/>
                            One way
                        </MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1 }}>
                    <Select
                    value={summary} 
                    onClick={handleOpen} 
                    readOnly
                    disableUnderline
                    >
                        <MenuItem  value={summary}>
                            <PersonOutlineIcon style={{ color: "grey", marginRight: "8px" }}/>
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
                  <Grid
                  container
                  alignItems="center"
                  spacing={1}
                  sx={{
                    marginBottom: "0.5rem",
                      }}
                  >
              <Grid item xs={6}>
                <Typography>
                  {category.charAt(0).toUpperCase() +
                    category.slice(1).replace(/([A-Z])/g, " $1")}
                </Typography>
              </Grid>
          <Grid item xs={2} sx={{ textAlign: "center" }}>
            <IconButton
              onClick={() => handleDecrement(category)}
              disabled={counts[category] === 0}
              sx={{
                width: "2rem",
                height: "2rem",
                bgcolor: counts[category] === 0 ? "grey.300" : "#F0FFFF",
                borderRadius: "4px",
                "&:hover": {
                  bgcolor: counts[category] === 0 ? "grey.300" : "#89CFF0",
                },
              }}
            >
              <RemoveIcon />
            </IconButton>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: "center" }}>
            <Typography>{counts[category]}</Typography>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: "center" }}>
            <IconButton
              onClick={() => handleIncrement(category)}
              sx={{
                width: "2rem",
                height: "2rem",
                bgcolor: "#F0FFFF",
                borderRadius: "4px",
                "&:hover": {
                  bgcolor: "#89CFF0",
                },
              }}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </React.Fragment>
    ))}
    <Button
      onClick={handleClose}
      fullWidth
      variant="contained"
      style={{ marginTop: 10 }}
    >
      Done
    </Button>
  </Box>
</Popover>



                <FormControl
                variant="standard"
                sx={{
                    marginTop: "0.8rem",
                    minWidth: { xs: 100, sm: 120 },
                    fontSize: { xs: "0.75rem", sm: "1rem" },
                  }}
                  >
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


                <Box
                sx={(theme) => ({
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 2,
                margin: "auto",
                marginTop: 0,
                height: "7rem",
                [theme.breakpoints.up(768)]: {
                    flexDirection: "row",
                    height: "3rem"
                },
                })}
                >
                    <Box
                    sx={(theme) => ({
                    display: "flex", 
                    flexDirection: "row", 
                    width: "95%", 
                    marginRight: 4, 
                    marginBottom:"1rem",
                        [theme.breakpoints.up(768)]: {
                            marginBottom:0,
                        },
                    })}
                    >
                        <TextField
                        placeholder="Where from?"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PanoramaFishEyeIcon sx={{ color: "gray", width: "0.9rem" }} />
                              </InputAdornment>
                            ),
                            sx: {
                                height: { xs: "auto", md: "2.2rem" },
                                },
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                height: { xs: "auto", md: "2.2rem" },
                                },
                              }}
                        />
                        <TextField
                        placeholder="Where to?"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationOnIcon sx={{ color: "gray", width: "1.5rem" }} />
                              </InputAdornment>
                            ),
                            sx: {
                                height: { xs: "auto", md: "2.2rem" },
                              },
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              height: { xs: "auto", md: "2.2rem" },
                            },
                          }}
                        />
                    </Box>
                    <Box 
                    sx={{display: "flex", flexDirection: "row", justifyContent:"center", width: "95%", marginRight: 4}}>
                        <TextField 
                        type="date"
                        placeholder="Departure"
                        label="Departure"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        size="small"
                        />
                        <TextField
                        type="date"
                        placeholder="Return"
                        label="Return"
                        value={returnDate}
                        onChange={(e)=> setReturnDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        size="small"
                        />
                    </Box>
                </Box>
            </Box>

            <Box
            sx={{
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center"
            }}>
                <Button
                variant="contained" 
                color="primary"
                sx={{
                borderRadius: "50rem", 
                textTransform: "none", 
                position: "relative", 
                top: "-20px", 
                margin: "auto"
                }} 
                onClick={handleSearch}
                >
                    <SearchIcon />
                    Explore
                </Button>
            </Box>

            <FlightResults 
            origin={origin}
            flightDetails={flightDetails}
            />
            
        </ThemeProvider>
    )
}