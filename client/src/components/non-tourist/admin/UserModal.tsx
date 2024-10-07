import { GenericModal } from "../../GenericModal";
import { TUser, Role } from "@/table-columns/user-columns";
import { ToggleableSwitchCard } from "../../ToggleableSwitchCard";

import { useState } from "react";

import ShortText from "../../ShortText";

import { GenericSelect } from "../../GenericSelect";

import EditableDatePicker from "../EditableDatePicker";

import { submitUser } from "@/api-calls/users-api-calls";

import { DEFAULTS, NATIONALITIES } from "@/lib/constants";
import { FaCircleCheck } from "react-icons/fa6";
import AddressList from "./AddressList";
import { Label } from "@radix-ui/react-label";

interface UserModalProps {
  userData?: TUser;
  dialogTrigger?: React.ReactNode;
}

export function UserModal({ userData, dialogTrigger }: UserModalProps) {
  const isNewUser: boolean = userData === undefined; // check if the user is new or existing
  const [modalUserData, setModalUserData] = useState<TUser | undefined>(userData ?? DEFAULTS.USER); // current user data present in the modal
  // create generic modal with components based on data type of columns
  return (
    <GenericModal
      title={userData?.firstName ?? "New User"}
      description="User Details"
      dialogTrigger={dialogTrigger}
      onSubmit={() => submitUser(modalUserData, isNewUser)}
    >
      {!isNewUser && (
        <>
          <Label>First Name: {modalUserData?.firstName}</Label>
          <Label>Last Name: {modalUserData?.lastName}</Label>
        </>
      )}

      <ShortText
        title="Username"
        initialValue={modalUserData?.username ?? ""}
        onSave={(value) =>
          setModalUserData(modalUserData ? { ...modalUserData, username: value } : undefined)
        }
        initialDisabled={!isNewUser}
        placeholder="Username"
      />

      {!isNewUser && <Label>Email: {modalUserData?.email}</Label>}

      <ShortText
        title="Password"
        initialValue={modalUserData?.password ?? ""}
        onSave={(value) =>
          setModalUserData(modalUserData ? { ...modalUserData, password: value } : undefined)
        }
        initialDisabled={!isNewUser}
        placeholder="Password"
      />

      {isNewUser ? (
        <div className="m-5 mx-6">
          <GenericSelect
            label={"Role"}
            options={[
              { value: Role.tourismGovernor, label: "Tourism Governor" },
              { value: Role.admin, label: "Admin" },
            ]}
            initalValue={modalUserData?.role ?? Role.tourist}
            onSelect={(value: string) =>
              setModalUserData(
                modalUserData ? { ...modalUserData, role: value as Role } : undefined,
              )
            }
            placeholder={"Select a role"}
          />
        </div>
      ) : (
        <Label>Role: {modalUserData?.role}</Label>
      )}

      <ToggleableSwitchCard
        title="Approved"
        switchState={modalUserData?.approved ?? false}
        onToggle={() =>
          setModalUserData(
            modalUserData ? { ...modalUserData, approved: !modalUserData.approved } : undefined,
          )
        }
        description={"Check if user is approved"}
        icon={<FaCircleCheck />}
      />

      {!isNewUser && (
        <>
          <Label> Date of Birth: {modalUserData?.dob?.toString()}</Label>{" "}
          <Label> Nationality: {modalUserData?.nationality}</Label>
        </>
      )}
      {!isNewUser && (
        <div className="m-5 mx-6">
          <AddressList
            initialAddresses={modalUserData?.addresses ?? []}
            onAddressesChange={(addresses) => {}}
            isDisabled={true}
          />
        </div>
      )}
      {!isNewUser && (
        <>
          <Label> Job: {modalUserData?.job}</Label>

          <Label> Phone Number: {modalUserData?.phoneNumber}</Label>

          <Label> Years of Experience: {modalUserData?.yearsOfExperience}</Label>

          <Label> Previous Work: {modalUserData?.previousWork}</Label>

          <Label> Website: {modalUserData?.website}</Label>

          <Label> Hotline: {modalUserData?.hotline}</Label>

          <Label> Company Profile: {modalUserData?.companyProfile}</Label>

          <Label> Company Name: {modalUserData?.companyName}</Label>

          <Label> Description: {modalUserData?.description}</Label>
        </>
      )}
    </GenericModal>
  );
}
