import { GenericModal } from "@/components/GenericModal";
import { ToggleableSwitchCard } from "@/components/ToggleableSwitchCard";
import { useState } from "react";
import { submitUser } from "@/api-calls/users-api-calls";
import { DEFAULTS } from "@/lib/constants";
import { FaCircleCheck } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { format } from "@/features/admin/utils/user-details-formatter";
import type { TUser } from "@/types/user";

interface UserModalProps {
  userData?: TUser;
  dialogTrigger?: React.ReactNode;
}

type KeyValuePairViewProps = {
  user: Partial<TUser>;
};

const KeyValuePairView = ({ user }: KeyValuePairViewProps) => {
  // Exclude specific fields and optional fields that are undefined
  const filteredEntries = Object.entries(user).filter(([key, value]) => {
    const excludedFields = [
      "previousWork",
      "companyProfile",
      "description",
      "createdAt",
      "updatedAt",
      "approved",
      "password",
      "_id",
    ];
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
};

export function UserModal({ userData, dialogTrigger }: UserModalProps) {
  const isNewUser: boolean = userData === undefined; // check if the user is new or existing
  const [modalUserData, setModalUserData] = useState<TUser>(userData ?? DEFAULTS.USER); // current user data present in the modal
  // create generic modal with components based on data type of columns
  return (
    <GenericModal
      title={userData?.firstName ?? "New User"}
      description="User Details"
      dialogTrigger={dialogTrigger}
      onSubmit={() => submitUser(modalUserData, isNewUser)}
    >
      <KeyValuePairView user={modalUserData} />

      {[
        { title: "Description", value: modalUserData.description },
        { title: "Company Profile", value: modalUserData.companyProfile },
        { title: "Previous Work", value: modalUserData.previousWork },
      ].map(({ title, value }) => {
        if (value)
          return (
            <Card className="w-full mb-5" key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea value={value} className="flex-grow min-h-40" readOnly={true} />
              </CardContent>
            </Card>
          );
      })}

      <ToggleableSwitchCard
        title="Approved"
        switchState={modalUserData?.approved ?? false}
        onToggle={() => setModalUserData({ ...modalUserData, approved: !modalUserData.approved })}
        description={"Check if user is approved"}
        icon={<FaCircleCheck />}
      />
    </GenericModal>
  );
}
