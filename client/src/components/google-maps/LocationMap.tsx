import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import GoogleMap from "./GoogleMap";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Save } from "lucide-react";

export default function LocationMap() {
  const [isEditable, setIsEditable] = useState(false);
  const location = "GUC boys dorms";
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>Location</CardTitle>
        <Button onClick={() => setIsEditable((prev) => !prev)}>
          {isEditable ? <Save /> : <Edit2 />}
        </Button>
      </CardHeader>
      <CardContent>
        <GoogleMap isEditable={isEditable} initialLocation={{ lat: 80, lng: 80 }} />
      </CardContent>
      <CardFooter className="text-gray-600 text-xl font-semibold">{location}</CardFooter>
    </Card>
  );
}
