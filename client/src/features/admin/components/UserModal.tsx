import { GenericModal } from "@/components/GenericModal";
import { ToggleableSwitchCard } from "@/components/ToggleableSwitchCard";
import { useState } from "react";
import { submitUser } from "@/api-calls/users-api-calls";
import { DEFAULTS } from "@/lib/constants";
import { FaCircleCheck } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { TUser } from "@/types/user";
import ShortText from "@/components/ShortText";
import { GenericSelect } from "@/components/GenericSelect";
import { UserRoleEnum } from "@/utils/enums";
import UserDocuments from "@/components/UserDocuments";
import KeyValuePairGrid from "@/components/KeyValuePairGrid";
import { format } from "../utils/key-value-formatters/user-details-formatter";

interface UserModalProps {
  userData?: TUser;
  dialogTrigger?: React.ReactNode;
}

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
      {isNewUser && (
        <>
          <ShortText
            title="Username"
            initialValue={modalUserData.username}
            onSave={(value) => setModalUserData({ ...modalUserData, username: value })}
            placeholder="Username"
            initialDisabled={!isNewUser}
            type="text"
          />

          <ShortText
            title="Password"
            initialValue={modalUserData.password}
            onSave={(value) => setModalUserData({ ...modalUserData, password: value })}
            initialDisabled={!isNewUser}
            placeholder="Password"
            type="text"
          />

          <GenericSelect
            label={"Role"}
            options={[
              { value: UserRoleEnum.tourismGovernor, label: "Tourism Governor" },
              { value: UserRoleEnum.admin, label: "Admin" },
            ]}
            onSelect={(value: string) =>
              setModalUserData({ ...modalUserData, role: value as UserRoleEnum })
            }
            placeholder={"Select a role"}
          />
        </>
      )}

      {!isNewUser && (
        <>
          <KeyValuePairGrid
            data={modalUserData}
            formatter={format}
            excludedFields={[
              "previousWork",
              "companyProfile",
              "description",
              "createdAt",
              "updatedAt",
              "approved",
              "password",
              "nationalID",
              "taxRegistration",
              "certificates",
              "_id",
            ]}
          />

          {[
            { title: "Description", value: modalUserData.description },
            { title: "Company Profile", value: modalUserData.companyProfile },
            { title: "Previous Work", value: modalUserData.previousWork },
          ].map(({ title, value }) => {
            if (value)
              return (
                <Card key={title}>
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
            switchState={modalUserData.approved}
            onToggle={() =>
              setModalUserData({ ...modalUserData, approved: !modalUserData.approved })
            }
            description={"Check if user is approved"}
            icon={<FaCircleCheck />}
          />
          <div>
            <h1 className="text-2xl font-semibold mt-6 mb-4">Uploaded Documents</h1>
            <UserDocuments
              certificatesUrls={modalUserData.certificates}
              governmentalDocumentsUrls={[
                ...(modalUserData.nationalID ? [modalUserData.nationalID] : []),
                ...(modalUserData.taxRegistration ? [modalUserData.taxRegistration] : []),
              ]}
            />
          </div>
        </>
      )}
    </GenericModal>
  );
}
