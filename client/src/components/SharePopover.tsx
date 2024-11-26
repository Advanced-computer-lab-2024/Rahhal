import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SharePopoverProps {
  link: string;
  size?: number;
  shareText?: boolean;
}
import { Share } from "lucide-react";

export default function SharePopover(props: SharePopoverProps) {
  const [checked, setChecked] = useState(false);
  return (
    <Popover>
      <PopoverTrigger>
        <button className="flex justify-center">
          <Share size={props.size} />
          {props.shareText && (
            <span className="ml-1 transition-all duration-300 hover:underline text-sm ">Share</span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96" align={"start"}>
        <div className="flex items-center space-x-2">
          <Input value={props.link} readOnly={true} autoFocus={false} />
          <button
            onClick={() => {
              navigator.clipboard.writeText(props.link);
              setChecked(true);
              setTimeout(() => {
                setChecked(false);
              }, 2000);
            }}
          >
            {!checked && <Copy className="w-5 h-5" />}
            {checked && <Check className="w-5 h-5 text-[#25956c]" />}
          </button>
        </div>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-400" />
          <span className="mx-3 text-gray-600">or</span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>
        <div className="flex items-center bg-black rounded-md">
          <a className="w-full" href={`mailto:?subject=Join Rahhal&body=${props.link}`}>
            {" "}
            <Button className="w-full"> Send Email </Button>
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
}
