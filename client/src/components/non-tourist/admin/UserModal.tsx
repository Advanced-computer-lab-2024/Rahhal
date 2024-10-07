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
      <ShortText
        title="First Name"
        initialValue={modalUserData?.firstName ?? ""}
        onSave={(value) =>
          setModalUserData(modalUserData ? { ...modalUserData, firstName: value } : undefined)
        }
        initialDisabled={!isNewUser}
        placeholder="First Name"
      />

      <ShortText
        title="Last Name"
        initialValue={modalUserData?.lastName ?? ""}
        onSave={(value) =>
          setModalUserData(modalUserData ? { ...modalUserData, lastName: value } : undefined)
        }
        initialDisabled={!isNewUser}
        placeholder="Last Name"
      />

      <ShortText
        title="Username"
        initialValue={modalUserData?.username ?? ""}
        onSave={(value) =>
          setModalUserData(modalUserData ? { ...modalUserData, username: value } : undefined)
        }
        initialDisabled={!isNewUser}
        placeholder="Username"
      />

      <ShortText
        title="Email"
        initialValue={modalUserData?.email ?? ""}
        onSave={(value) =>
          setModalUserData(modalUserData ? { ...modalUserData, email: value } : undefined)
        }
        initialDisabled={!isNewUser}
        placeholder="Email"
      />

      <ShortText
        title="Password"
        initialValue={modalUserData?.password ?? ""}
        onSave={(value) =>
          setModalUserData(modalUserData ? { ...modalUserData, password: value } : undefined)
        }
        initialDisabled={!isNewUser}
        placeholder="Password"
      />

      <ShortText
        title="Role"
        initialValue={modalUserData?.role ?? ""}
        onSave={(value) =>
          setModalUserData(modalUserData ? { ...modalUserData, role: value as Role } : undefined)
        }
        initialDisabled={!isNewUser}
        placeholder="Role"
      />

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

      <EditableDatePicker
        date={modalUserData?.dob ?? new Date()}
        onDateChange={(date) =>
          setModalUserData(modalUserData ? { ...modalUserData, dob: date } : undefined)
        }
        initialIsDisabled={!isNewUser}
      />
      <div className="m-5 mx-6">
        <GenericSelect
          label={"Nationality"}
          options={NATIONALITIES}
          initalValue={modalUserData?.nationality ?? ""}
          onSelect={(value: string) => {
            const selectedNationality = NATIONALITIES.find(
              (nationality: { value: string }) => nationality.value === value,
            );

            setModalUserData(
              modalUserData
                ? { ...modalUserData, nationality: selectedNationality?.value }
                : undefined,
            );
          }}
          placeholder={"Select a nationality"}
        />
      </div>
      <div className="m-5 mx-6">
        <AddressList
          initialAddresses={modalUserData?.addresses ?? []}
          onAddressesChange={(addresses) =>
            setModalUserData(modalUserData ? { ...modalUserData, addresses } : undefined)
          }
          isDisabled={!isNewUser}
        />
      </div>
      <ShortText
        title="Job"
        initialValue={modalUserData?.job ?? ""}
        onSave={(value) =>
          setModalUserData(modalUserData ? { ...modalUserData, job: value } : undefined)
        }
        initialDisabled={!isNewUser}
        placeholder="Job"
      />

      <ShortText
        title="Phone Number"
        initialValue={modalUserData?.phoneNumber ?? ""}
        onSave={(value) =>
          setModalUserData(modalUserData ? { ...modalUserData, phoneNumber: value } : undefined)
        }
        initialDisabled={!isNewUser}
        placeholder="Phone Number"
      />

      <ShortText
        title="Years of Experience"
        initialValue={(modalUserData?.yearsOfExperience ?? 0).toString()}
        onSave={(value) =>
          setModalUserData(
            modalUserData ? { ...modalUserData, yearsOfExperience: parseInt(value) } : undefined,
          )
        }
        initialDisabled={!isNewUser}
        placeholder="Years of Experience"
      />

      <ShortText
        title="Previous Work"
        initialValue={modalUserData?.previousWork ?? ""}
        onSave={(value) =>
          setModalUserData(modalUserData ? { ...modalUserData, previousWork: value } : undefined)
        }
        initialDisabled={!isNewUser}
        placeholder="Previous Work"
      />

      <ShortText
        title="Website"
        initialValue={modalUserData?.website ?? ""}
        onSave={(value) =>
          setModalUserData(modalUserData ? { ...modalUserData, website: value } : undefined)
        }
        initialDisabled={!isNewUser}
        placeholder="Website"
      />

      <ShortText
        title="Hotline"
        initialValue={modalUserData?.hotline ?? ""}
        onSave={(value) =>
          setModalUserData(modalUserData ? { ...modalUserData, hotline: value } : undefined)
        }
        initialDisabled={!isNewUser}
        placeholder="Hotline"
      />

      <ShortText
        title="Company Profile"
        initialValue={modalUserData?.companyProfile ?? ""}
        onSave={(value) =>
          setModalUserData(modalUserData ? { ...modalUserData, companyProfile: value } : undefined)
        }
        initialDisabled={!isNewUser}
        placeholder="Company Profile"
      />

      <ShortText
        title="Company Name"
        initialValue={modalUserData?.companyName ?? ""}
        onSave={(value) =>
          setModalUserData(modalUserData ? { ...modalUserData, companyName: value } : undefined)
        }
        initialDisabled={!isNewUser}
        placeholder="Company Name"
      />

      <ShortText
        title="Description"
        initialValue={modalUserData?.description ?? ""}
        onSave={(value) =>
          setModalUserData(modalUserData ? { ...modalUserData, description: value } : undefined)
        }
        initialDisabled={!isNewUser}
        placeholder="Description"
      />
    </GenericModal>
  );
}
