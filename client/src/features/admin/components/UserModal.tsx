import { GenericModal } from "@/components/GenericModal";
import { ToggleableSwitchCard } from "@/components/ToggleableSwitchCard";
import { useState } from "react";
import { submitUser } from "@/api-calls/users-api-calls";
import { DEFAULTS } from "@/lib/constants";
import { FaCircleCheck } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { TUser } from "@/types/user";
import { GenericSelect } from "@/components/GenericSelect";
import { UserRoleEnum } from "@/utils/enums";
import UserDocuments from "@/components/UserDocuments";
import KeyValuePairGrid from "@/components/KeyValuePairGrid";
import { format } from "../utils/key-value-formatters/user-details-formatter";
import PictureViewer from "@/components/PictureViewer";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UserModalProps {
  userData?: TUser;
  dialogTrigger?: React.ReactNode;
  onDelete?: (id: string) => void;
  onSubmit?: (user: TUser) => void;
}

export function UserModal({
  userData,
  dialogTrigger,
  onDelete,
  onSubmit,
}: UserModalProps) {
  const isNewUser: boolean = userData === undefined; // check if the user is new or existing
  const [modalUserData, setModalUserData] = useState<TUser>(
    userData ?? DEFAULTS.USER
  ); // current user data present in the modal

  const handleDelete = () => {
    if (modalUserData && onDelete) {
      onDelete(modalUserData._id);
    }
  };

  const handleSubmit = async () => {
    if (!modalUserData) return;

    try {
      const response = await submitUser(modalUserData, isNewUser);
      if (
        response?.status === STATUS_CODES.STATUS_OK ||
        response?.status === STATUS_CODES.CREATED
      ) {
        toast({
          title: "Success",
          description: "User saved successfully",
          style: {
            backgroundColor: "#34D399",
            color: "white",
          },
        });
        if (onSubmit) {
          onSubmit(modalUserData);
          setModalUserData(DEFAULTS.USER);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          (error as any).response?.data?.message || "Error saving user",
        variant: "destructive",
      });
    }
  };

  return (
    <GenericModal
      title={userData?.firstName ?? "New User"}
      description="User Details"
      dialogTrigger={dialogTrigger}
      onSubmit={handleSubmit}
      showDeleteButton={!isNewUser}
      onDelete={handleDelete}
    >
      {isNewUser && (
        <div className="flex flex-col gap-4 p-4 sm:p-6">
          <div className="flex flex-col gap-2">
            <Label>Username</Label>
            <Input
              value={modalUserData.username}
              onChange={(e) =>
                setModalUserData({ ...modalUserData, username: e.target.value })
              }
              placeholder="Username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Password</Label>
            <Input
              value={modalUserData.password}
              onChange={(e) =>
                setModalUserData({ ...modalUserData, password: e.target.value })
              }
              placeholder="Password"
            />
          </div>

          <GenericSelect
            label={"Role"}
            options={[
              {
                value: UserRoleEnum.tourismGovernor,
                label: "Tourism Governor",
              },
              { value: UserRoleEnum.admin, label: "Admin" },
            ]}
            onSelect={(value: string) =>
              setModalUserData({
                ...modalUserData,
                role: value as UserRoleEnum,
              })
            }
            placeholder={"Select a role"}
          />
        </div>
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
              "profilePicture",
            ]}
          />

          {[
            { title: "Description", value: modalUserData.description },
            { title: "Company Profile", value: modalUserData.companyProfile },
            { title: "Previous Work", value: modalUserData.previousWork },
          ].map(({ title, value }) => {
            if (value)
              return (
                <Card key={title} className="w-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Textarea
                      value={value}
                      className="flex-grow min-h-32 sm:min-h-40 text-sm"
                      readOnly={true}
                    />
                  </CardContent>
                </Card>
              );
          })}
          <PictureViewer
            title="Profile Picture"
            description="User's profile picture"
            imageSources={
              modalUserData.profilePicture ? [modalUserData.profilePicture] : []
            }
          />
          <ToggleableSwitchCard
            title="Approved"
            switchState={modalUserData.approved}
            onToggle={() =>
              setModalUserData({
                ...modalUserData,
                approved: !modalUserData.approved,
              })
            }
            description={"Check if user is approved"}
            icon={<FaCircleCheck />}
          />
          {modalUserData.role !== UserRoleEnum.tourist && (
            <div className="w-full">
              <h1 className="text-xl sm:text-2xl font-semibold mt-6 mb-4">
                Uploaded Documents
              </h1>
              <UserDocuments
                certificatesUrls={modalUserData.certificates}
                governmentalDocumentsUrls={[
                  ...(modalUserData.nationalID
                    ? [modalUserData.nationalID]
                    : []),
                  ...(modalUserData.taxRegistration
                    ? [modalUserData.taxRegistration]
                    : []),
                ]}
              />
            </div>
          )}
        </>
      )}
    </GenericModal>
  );
}
