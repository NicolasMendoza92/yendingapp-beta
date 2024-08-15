import { useRef, useCallback, useState } from "react";
import { useLoadScript, Autocomplete, Libraries } from "@react-google-maps/api";
import { defaultMapCenter } from "@/lib/constants";

const libraries: "places"[] = ["places"];

interface LocationAutocompleteProps {
  onPlaceSelected: (coordinates: { lat: number; lng: number }) => void;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  hasMin?: boolean;
  hasMax?: boolean;
  initialValue?: string;
  disabled?: boolean;
}

function LocationAutocomplete({
  onPlaceSelected,
  name,
  label,
  placeholder,
  required,
  initialValue = "",
  type,
  disabled,
}: LocationAutocompleteProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    libraries: libraries as Libraries,
  });

  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = useCallback(
    (autocomplete: google.maps.places.Autocomplete) => {
      autocompleteRef.current = autocomplete;
    },
    [],
  );

  const onPlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        const coordinates = {
          lat: location?.lat() || defaultMapCenter.lat,
          lng: location?.lng() || defaultMapCenter.lng,
        };
        onPlaceSelected(coordinates);
      }
    }
  }, [onPlaceSelected]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <label className="text-secondary">{label}</label>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={handleChange}
          className={`w-full ${value ? "text-secondary" : "text-secondary"}`}
          disabled={disabled}
        />
      </Autocomplete>
    </>
  );
}

export default LocationAutocomplete;
