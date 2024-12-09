import axios from "axios";

const API_KEY = process.env.REACT_APP_MY_API_KEY;
const API_HOST = "sky-scrapper.p.rapidapi.com";

export const fetchSkyIdAndEntityId = async (location) => {
  const options = {
    method: "GET",
    url: `https://${API_HOST}/api/v1/flights/searchAirport`,
    params: { query: location, locale: "en-US" },
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    if (response.data?.data?.length > 0) {
      return {
        skyId: response.data.data[0].skyId,
        entityId: response.data.data[0].entityId,
      };
    } else {
      console.error(`No SkyId found for location: ${location}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching SkyId for location: ${location}`, error);
    return null;
  }
};

export const fetchFlightDetails = async (
  originSkyIdAndEntityId,
  destinationSkyIdAndEntityId,
  tripClass,
  counts,
  departureDate,
  returnDate
) => {
  const options = {
    method: "GET",
    url: `https://${API_HOST}/api/v2/flights/searchFlights`,
    params: {
      originSkyId: originSkyIdAndEntityId.skyId,
      originEntityId: originSkyIdAndEntityId.entityId,
      destinationSkyId: destinationSkyIdAndEntityId.skyId,
      destinationEntityId: destinationSkyIdAndEntityId.entityId,
      cabinClass: tripClass || "economy",
      adults: counts.adults,
      children: counts.children,
      infants: counts.infantsSeat + counts.infantsLap,
      sortBy: "best",
      currency: "USD",
      market: "en-US",
      countryCode: "US",
      date: departureDate,
      ...(returnDate && { returnDate }),
    },
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data?.data?.itineraries || [];
  } catch (error) {
    console.error("Error fetching flight details:", error);
    return [];
  }
};
