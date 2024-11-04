import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Section {
  title: string;
  items: string[];
}

interface TermsAndConditionsModalProps {
  sections: Section[];
}

export function TermsAndConditionsModal({ sections = [] }: TermsAndConditionsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="p-0 h-auto font-bold hover:underline cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
        >
          Terms and Conditions
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl flex flex-col max-h-[80vh]">
        <DialogHeader>
          {/* <DialogTitle className="text-2xl font-bold">Terms and Conditions <hr/></DialogTitle> */}
          <DialogTitle className="text-4xl font-bold pb-4">
            Terms and Conditions
            <hr className="mt-4" />
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-6">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <h2 className="text-xl font-semibold mb-3">
                {sectionIndex + 1}. {section.title}
              </h2>
              <ul className="list-disc space-y-2 ml-6">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <DialogFooter className="flex-shrink-0 mt-6 border-t pt-4">
          <DialogClose asChild>
            <Button
              className="bg-black hover:bg-gray-700 text-white transition-colors"
              variant="default"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
