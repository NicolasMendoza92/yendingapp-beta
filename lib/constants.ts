export const baseUrl = process.env.BASE_URL;
export const ablyApiKey = process.env.ABLY_API_KEY;
export const today = new Date();

//map

export const defaultMapContainerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "15px",
};

export const defaultMapCenter = {
  lat: 41.3951006,
  lng: 2.1790547,
};

export const defaultMapZoom = 14;

export const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
};
