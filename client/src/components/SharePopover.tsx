import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

interface SharePopoverProps {
  link: string;
}
import { Share } from "lucide-react";

export default function SharePopover(props: SharePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <button>
          <Share />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center space-x-2">
          <Input value={props.link} readOnly={true} autoFocus={false} />
          <Button
            onClick={() => {
              navigator.clipboard.writeText(props.link);
            }}
          >
            Copy
          </Button>
        </div>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-400" />
          <span className="mx-3 text-gray-600">or</span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>
        <div className="flex items-center">
          <a className="w-full" href={`mailto:?subject=Join Rahhal&body=${props.link}`}>
            {" "}
            <Button className="w-full"> Send Email </Button>
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
}
