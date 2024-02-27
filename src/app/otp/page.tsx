"use client";
import { LuLock } from "react-icons/lu";
import { SubmitHandler, useForm } from "react-hook-form";
import { silkscreen } from "../font";

type OtpInputs = {
  code: string;
};

const Page = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<OtpInputs>();

  const onSubmit: SubmitHandler<OtpInputs> = (data) => {
    const otpData = {
      code: data.code,
    };
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-y-2">
          <label className={silkscreen.className}>
            OTP CODE: &nbsp;
            <input
              type="text"
              // {...register("password", { required: "password field is required" })}
              className="rounded-sm text-black"
            />
            {/* <div className="text-red-500">{errors && errors.password?.message}</div> */}
          </label>
        </div>
        <div>
          <button className="btn-primary mx-auto my-3 flex items-center" type="submit">
            <LuLock className="mr-1" /> Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
