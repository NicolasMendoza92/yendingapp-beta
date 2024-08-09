"use client";
import GenderSelect from "@/components/forms/GenderSelected";
import InterestSelected from "@/components/forms/InterestSelected";
import { updateUser } from "@/lib/actions";
import { dob_day_values, dob_month_values } from "@/lib/data";
import { FormState } from "@/types/onboarding";
import toast from "react-hot-toast";
import { CustomButton } from "../buttons/CustomButton";
import CustomDropDowns from "../customComponents/CustomDropDown";
import CustomInput from "../customComponents/CustomInput";
import CustomPhotoUploader from "../customComponents/CustomPhotoUploader";
import CustomTextArea from "../customComponents/CustomTextArea";
import { useFormState } from "react-dom";

const handleOnboardingForm = async (
  dispatch: (formData: FormData) => void,
  formData: FormData,
) => {
  return new Promise((resolve) => {
    dispatch(formData);
    resolve(true);
  });
};

export default function OnboardingForm({ user }: { user?: FormState }) {
  const [state, dispatch] = useFormState(updateUser, undefined);

  const handleForm = async (formData: FormData) => {
    await handleOnboardingForm(dispatch, formData);
    if (state?.error) {
      toast.dismiss();
      toast.error(state.error);
    } else {
      toast.dismiss();
      toast.success("Profile updated!");
    }
  };

  return (
    <form action={handleForm}>
      <div className="grid grid-cols-3 gap-3 text-secondary">
        <div className="col-span-3 lg:col-span-2">
          <CustomInput
            label="First name"
            name="name"
            placeholder="First Name"
            required={true}
            type="text"
            initialValue={user?.name}
          />
          <div className="grid grid-cols-3 gap-2 my-3">
            <div className="col-span-3 lg:col-span-1">
              <CustomDropDowns
                name="dob_day"
                label="Day"
                values={dob_day_values}
                type="select"
                initialValue={user?.dob_day}
              />
            </div>
            <div className="col-span-3 lg:col-span-1">
              <CustomDropDowns
                name="dob_month"
                label="Month"
                values={dob_month_values}
                type="select"
                initialValue={user?.dob_month}
              />
            </div>
            <div className="col-span-3 lg:col-span-2">
              <CustomInput
                label="Year"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                type="number"
                hasMin={true}
                hasMax={true}
                initialValue={user?.dob_year}
              />
            </div>
          </div>

          <div className="w-full gap-3">
            <label>Gender</label>
            <GenderSelect initialValue={user?.gender_identity} />
          </div>
          <div className="w-full gap-3">
            <label>Show Me</label>
            <InterestSelected initialValue={user?.previas_interest} />
          </div>
          <div className="flex items-center text-secondary gap-3 my-2">
            <CustomDropDowns
              name="show_interest"
              label="Show interest"
              type="checkbox"
              initialValue={user?.show_interest}
            />
          </div>
          <div className="my-3 gap-2">
            <CustomTextArea
              name="about"
              label="About me"
              required={true}
              initialValue={user?.about}
            />
          </div>
          <div>
            {user?.previas_created?.length ? (
              <div>Previas created: {user?.previas_created.length}</div>
            ) : (
              <p>{`You haven't created any`}</p>
            )}
            {user?.previas_requests?.length ? (
              <div>Previas you joined: {user?.previas_requests.length}</div>
            ) : (
              <p>{`You haven't joined any`}</p>
            )}
          </div>
        </div>
        <div className="col-span-3 lg:col-span-1">
          <div className="flex flex-wrap justify-center items-center gap-2">
            <CustomPhotoUploader
              label="Upload photo"
              name="url_img"
              initialValue={user?.url_img}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <CustomButton text="Save" />
      </div>
    </form>
  );
}
