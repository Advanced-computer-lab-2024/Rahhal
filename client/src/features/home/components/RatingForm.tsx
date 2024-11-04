import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import AutoFormLabel from "@/components/ui/auto-form/common/label";
import { AutoFormInputComponentProps } from "@/components/ui/auto-form/types";
import { FormControl, FormDescription, FormItem } from "@/components/ui/form";
import { z } from "zod";

function StarIcon() {
  return (
    <svg
      className="w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function RatingStars({
  rating,
  onRateChange,
}: {
  rating: number;
  onRateChange: (rating: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`p-2 rounded-full transition-colors ${
            star <= rating
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted-foreground hover:text-muted"
          }`}
          onClick={() => onRateChange(star)}
        >
          <StarIcon />
        </button>
      ))}
    </div>
  );
}

function AutoFormRating({
  label,
  isRequired,
  field,
  fieldConfigItem,
}: AutoFormInputComponentProps) {
  return (
    <FormItem>
      <AutoFormLabel label={fieldConfigItem?.label || label} isRequired={isRequired} />
      <FormControl>
        <RatingStars rating={field.value} onRateChange={field.onChange} />
      </FormControl>
      <div className="space-y-1 leading-none">
        {fieldConfigItem.description && (
          <FormDescription>{fieldConfigItem.description}</FormDescription>
        )}
      </div>
    </FormItem>
  );
}

type RatingEntity = {
  rating: {
    label: string;
    description: string;
  };
  comment: {
    label: string;
    description: string;
  };
};

function getFieldsConfig(ratingEntities: RatingEntity[]) {
  return ratingEntities.reduce((acc: Record<string, any>, entity, index) => {
    acc[`rating-${index}`] = {
      label: entity.rating.label,
      fieldType: AutoFormRating,
      description: entity.rating.description,
    };
    acc[`comment-${index}`] = {
      label: entity.comment.label,
      fieldType: "textarea",
      description: entity.comment.description,
    };
    return acc;
  }, {});
}
function getZodSchema(ratingEntities: RatingEntity[]) {
  const x = ratingEntities.reduce((acc: Record<string, any>, entity, index) => {
    acc[`rating-${index}`] = z.coerce.number().min(1).max(5).describe(entity.rating.label);
    acc[`comment-${index}`] = z.string().max(1000).optional();
    return acc;
  }, {});
  return z.object(x);
}

export default function RatingForm({ ratingEntities }: { ratingEntities: RatingEntity[] }) {
  return (
    <AutoForm
      formSchema={getZodSchema(ratingEntities)}
      onSubmit={(values) => console.log(values)}
      fieldConfig={getFieldsConfig(ratingEntities)}
    >
      <AutoFormSubmit className="bg-primary text-white w-full mt-4">Sign Up</AutoFormSubmit>
    </AutoForm>
  );
}
