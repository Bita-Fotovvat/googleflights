import { Typography, Box, Card, Divider } from "@mui/material";


export default function FlightResults(props){
    return(
    <>
    <Typography variant="h6" sx={{ textAlign:"center", marginTop:"2rem", marginBottom: "1rem" }}>
        Flights from {props.origin}
    </Typography>

    {props.flightDetails.length > 0 && (
        <Card
        sx={{ 
            border: "0.03rem solid #ddd",
            borderRadius: 2,
            width: "90%",
            margin: "auto"
          }}
          >
            {props.flightDetails.map((flight,index)=> (
                <Box
                key={index}
                >
                    <Box
                    sx={{
                    display: "flex",
                    padding: "1rem 1rem 0 1rem",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    }}
                    >
                        {flight.legs[0]?.carriers?.marketing[0]?.logoUrl && (
                        <img
                        src={flight.legs[0].carriers.marketing[0].logoUrl}
                        alt={`${flight.legs[0].carriers.marketing[0].name} Logo`}
                        style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            objectFit: "contain", 
                        }}
                        />
                        )}
                        <Typography>
                            {flight.legs[0]?.carriers?.marketing[0]?.name || "Unknown Airline"}
                        </Typography>
                        <Typography variant="body1">
                            {flight.price?.formatted || "Price unavailable"}
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{  fontSize:"0.8rem", padding: "0 1rem 0 1rem" }}>
                        {flight.legs[0]?.stopCount} stops ·{" "}
                        {Math.floor(flight.legs[0]?.durationInMinutes / 60)} hr{" "}
                        {flight.legs[0]?.durationInMinutes % 60} min
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize:"0.8rem", padding: "0 1rem 1rem 1rem" }}>
                        {flight.legs[0]?.origin?.displayCode} -{" "}
                        {flight.legs[0]?.destination?.displayCode}
                    </Typography>
                    <Divider sx={{width: "100%"}}/>
                </Box>
            ))}
        </Card>
    )}
    </>
    )
}