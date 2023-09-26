"use client";
import Input from "@/components/Input";
import Switch from "@/components/Switch";
import { RootStore } from "@/services";
import { Profile } from "@/services/admin/profile";
// import { Profile } from "@/services/admin/profile";
import { ChangeEvent, useEffect, useState } from "react";
import { Resolver, SubmitHandler, useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";

type ProfileInput = {
  mobile_number?: number;
  name?: string;
  two_factor_enabled?: boolean;
};

const resolver: Resolver<ProfileInput> = async (values) => {
  return {
    values: values ? values : {},
    errors: !values.name
      ? {
          name: { type: "required", message: "name is required" },
          mobile_number: { type: "required", message: "mobile is required" },
        }
      : {},
  };
};

const Page = () => {
  const { data } = useSelector((state: RootStore) => state.profile);
  const [formData, setFormData] = useState<Profile>({ id: 0, mobile_number: 0, name: "", two_factor_enabled: false });

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("mobile_number", data.mobile_number);
      setValue("two_factor_enabled", data.two_factor_enabled);
    }
  }, [data]);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProfileInput>({ resolver });

  const onSubmit: SubmitHandler<ProfileInput> = (data) => {
    console.log("submit: ", data);
  };

  const toggleTwoFactor = (evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.checked);
    // setFormData({ ...formData, two_factor_enabled: evt.target.checked });
  };

  return (
    <div className="p-2">
      <h1 className="text-center">Profile</h1>
      <div className="flex justify-center">
        <form className="flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-dark flex space-x-2 dark:text-white">
            {/* <label>Fullname</label> */}
            {/* <Controller
              name="name"
              control={control}
              render={({ field }) => <input className="rounded-md bg-transparent" placeholder="name" {...field} />}
            /> */}
            {/* <Controller
              name="name"
              control={control}
              render={({ field }) => <Input className="rounded-md bg-transparent" placeholder="Fullname" {...field} />}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>} */}
          </div>
          <div className="text-dark flex space-x-2 dark:text-white">
            {/* <label>Mobile Number</label>
            <Controller
              name="mobile_number"
              control={control}
              render={({ field }) => (
                <input className="rounded-md bg-transparent" placeholder="mobile_number" {...field} />
              )}
            /> */}
            {/* <Controller
              name="mobile_number"
              control={control}
              render={({ field }) => (
                <Input className="rounded-md bg-transparent" placeholder="Mobile Number" {...field} />
              )}
            /> */}
            {errors.mobile_number && <p className="text-red-500">{errors.mobile_number.message}</p>}
          </div>
          <div className="text-dark dark:text-white">
            <Controller
              name="two_factor_enabled"
              control={control}
              render={({ field }) => (
                <Switch placeholder="Enabled Two Factor" {...register("two_factor_enabled")} {...field} />
              )}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Page;
