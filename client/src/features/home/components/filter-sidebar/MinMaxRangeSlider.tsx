import { DualRangeSlider } from "@/components/ui/DualRangeSlider";
import { useRef } from "react";

interface SliderProps {
  values: number[];
  onValueChange: (value: number[]) => void;
}

function MinMaxRangeSlider({ values, onValueChange }: SliderProps) {
  const min = useRef(values[0]);
  const max = useRef(values[1]);

  const onValueChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      if (value <= values[1]) {
        onValueChange([value, values[1]]);
      }
    }
  };

  const onValueChangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? values[1] : parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      if (value >= values[0]) {
        onValueChange([values[0], value]);
      }
    }
  };
  return (
    <div className="w-[90%] mt-7">
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
            className="w-[80%] p-2 border border-gray-300 rounded-full  text-center"
            onChange={onValueChangeMin}
          />
        </div>
        <div className="justify-center text-center ">
          <p>Maximum</p>
          <input
            type="text"
            name="max"
            value={values[1]}
            className="w-[80%] p-2 border border-gray-300 rounded-full text-center"
            onChange={onValueChangeMax}
          />
        </div>
      </div>
    </div>
  );
}
export default MinMaxRangeSlider;
