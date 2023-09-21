"use client";

import { useToast } from "@/components/Toast";
import { Register, adminRegister } from "@/services/register";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuDog } from "react-icons/lu";
import { useDispatch } from "react-redux";

type RegisterInputs = {
  mobile_number: string;
  password: string;
  allow_register: string;
};

const Page = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Register>({
    mobile_number: 0,
    password: "",
    allow_register: "",
  });
  // const { showToast, closeToast } = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    console.log(data);

    const registerData: Register = {
      mobile_number: parseInt(data.mobile_number),
      password: data.password,
      allow_register: data.allow_register,
    };
    dispatch(adminRegister(registerData));
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="my-2 flex items-center justify-center">
          REGISTER ADMIN ACCOUNT <LuDog className="ml-2" />
        </h2>
        <div className="mb-2 space-y-2">
          <input
            type="text"
            {...register("mobile_number", { required: true, maxLength: 10 })}
            className="rounded-full bg-white indent-4 dark:bg-slate-600"
          />
          <div>{errors && errors.mobile_number?.message}</div>
        </div>
        <div className="space-y-2">
          <input
            type="password"
            {...register("password", { required: true })}
            className="rounded-full bg-white indent-4 dark:bg-slate-600"
          />
          <div>{errors && errors.password?.message}</div>
        </div>
        <div className="space-y-2">
          <input
            type="text"
            {...register("allow_register")}
            className="rounded-full bg-white indent-4 dark:bg-slate-600"
          />
          <div>{errors && errors.allow_register?.message}</div>
        </div>
        {/* <Input type="text" placeholder="mobile" {...register("mobile_number", {required: true, maxLength: 10})} icon={<LuPhone />} />
            <Input type="password" placeholder="password" {...register("password", {required: true })} icon={<LuLock />} /> */}
        <button className="btn-primary mx-auto my-3 flex items-center" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Page;
