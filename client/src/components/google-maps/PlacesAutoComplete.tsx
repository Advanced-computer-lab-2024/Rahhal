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

async function fetchData(inputValue: string) {
  const { data } = await axios.get(
    `http://localhost:3000/api/google-maps/autocomplete?input=${inputValue}`,
  );
  console.log(data);
  return data;
}

type Prediction = {
  place_id: string;
  description: string;
  reference: string;
};

export default function PlacesAutoComplete() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [input, setInput] = useState("");
  const [debouncedInput] = useDebounce(input, 500); // Debounce input value by 500ms to reduce API calls
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchPredictions = async () => {
      const predictions = await fetchData(debouncedInput);
      setPredictions(predictions ?? []);
    };
    fetchPredictions();
  }, [debouncedInput]);

  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
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
            <CommandItem key={prediction.place_id}>{prediction.description}</CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
