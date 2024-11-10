import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "@/features/admin/utils/user-details-formatter";

export default function KeyValuePairGrid({
  data,
  excludedFields = [],
}: {
  data: Record<string, any>;
  excludedFields?: string[];
}) {
  // Exclude specific fields and optional fields that are undefined
  const filteredEntries = Object.entries(data).filter(([key, value]) => {
    if (!value) return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (excludedFields.includes(key)) return false;
    return true;
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>General Information</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEntries.map(([key, value]) => {
            const [formattedKey, formattedValue] = format(key, value);
            return (
              <div
                key={key}
                className="flex flex-col p-4 bg-muted rounded-lg overflow-hidden break-words"
              >
                <span className="text-sm font-medium text-muted-foreground mb-1">
                  {formattedKey}
                </span>
                <span className="text-base">{formattedValue}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
