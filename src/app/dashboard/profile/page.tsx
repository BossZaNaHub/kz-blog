"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Switch from "@/components/Switch";
import { RootStore } from "@/services";
import { Profile } from "@/services/admin/profile";
import { useAppSelector } from "@/services/hook";
// import { Profile } from "@/services/admin/profile";
import { ChangeEvent, useEffect, useState } from "react";
import { Resolver, SubmitHandler, useForm, Controller } from "react-hook-form";

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
  const { data } = useAppSelector((state: RootStore) => state.profile);
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
      <div className="mx-auto flex w-full max-w-md justify-center">
        <form className="flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Fullname" label="Fullname" {...register("name")} required />
          <Input placeholder="Mobile Number" label="Mobile number" {...register("mobile_number")} required />
          {/* {errors.mobile_number && <p className="text-red-500">{errors.mobile_number.message}</p>} */}
          <div className="text-dark dark:text-white">
            <Switch placeholder="Enabled Two Factor" {...register("two_factor_enabled")} />
            {/* <Controller
              name="two_factor_enabled"
              control={control}
              render={({ field }) => (
                
              )}
            /> */}
          </div>
          <Button type="submit" color="info">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
