import { useRef } from "react";
import { DualRangeSlider } from "@/components/ui/DualRangeSlider";

interface SliderProps {
  values: number[];
  onValueChange: (value: number[]) => void;
}

function MinMaxRangeSlider({ values, onValueChange }: SliderProps) {
  const min = useRef(values[0]);
  const max = useRef(values[1]);

  const onValueChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value);
    if (value >= min.current && value <= max.current) {
      onValueChange([value, values[1]]);
    }
  };
  const onValueChangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? max.current : parseInt(e.target.value);
    if (value >= min.current && value <= max.current) {
      onValueChange([values[0], value]);
    }
  };
  return (
    <div className="mt-8 w-[90%]">
      <DualRangeSlider
        min={min.current}
        max={max.current}
        value={values}
        onValueChange={onValueChange}
        label={(value) => value}
        labelPosition="top"
      />
      <div className="mt-5 flex justify-between">
        <div className="justify-center text-center ">
          <p>Minimum</p>
          <input
            type="text"
            name="min"
            defaultValue={values[0]}
            value={values[0]}
            className="w-[50%] p-2 border border-gray-300 rounded-full  text-center"
            onChange={onValueChangeMin}
          />
        </div>
        <div className="justify-center text-center ">
          <p>Maximum</p>
          <input
            type="text"
            name="max"
            value={values[1]}
            className="w-[50%] p-2 border border-gray-300 rounded-full text-center"
            onChange={onValueChangeMax}
          />
        </div>
      </div>
    </div>
  );
}
export default MinMaxRangeSlider;
