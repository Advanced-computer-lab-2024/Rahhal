import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { cn } from "@/lib/utils";

type Prediction = {
  place_id: string;
  description: string;
  reference: string;
};

type PlacesAutocompleteProps = {
  setLocation: (location: { lat: number; lng: number }) => void;
};

async function fetchPlacesAutocomplete(inputValue: string) {
  const { data } = await axios.get(
    `http://localhost:3000/api/google-maps/autocomplete?input=${inputValue}`,
  );
  console.log(data);
  return data;
}

async function fetchPlaceLocation(placeId: string) {
  const { data } = await axios.get(
    `http://localhost:3000/api/google-maps/place-details?placeId=${placeId}`,
  );
  return data.location;
}

export default function PlacesAutocomplete({ setLocation }: PlacesAutocompleteProps) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  // Creates a debounced version of the 'input' state that updates only after 500ms of no changes.
  // Debouncing limits the number of times a function is called by waiting until no new inputs are made within a specified delay period.
  const [debouncedInput] = useDebounce(input, 500);

  useEffect(() => {
    const fetchPredictions = async () => {
      if (debouncedInput) {
        const predictions = await fetchPlacesAutocomplete(debouncedInput);
        setPredictions(predictions ?? []);
      }
    };
    fetchPredictions();
  }, [debouncedInput]);

  return (
    <Command className="rounded-lg border shadow-md w-80 m-1">
      <CommandInput
        placeholder="Start typing to search..."
        value={input}
        onValueChange={setInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <CommandList
        className={cn({
          hidden: predictions.length === 0 || !isFocused,
        })}
      >
        <CommandGroup heading="Suggestions">
          {predictions.map((prediction) => (
            <CommandItem
              key={prediction.place_id}
              onMouseDown={async () => {
                setInput(prediction.description);
                const placeLocation = await fetchPlaceLocation(prediction.place_id);
                setLocation(placeLocation);
              }}
            >
              {prediction.description}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
