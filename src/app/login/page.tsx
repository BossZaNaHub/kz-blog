"use client";
import { Fragment, useEffect, useState } from "react";
import { Login, clientLogin, clientUserReset } from "@/services/user";
import { RootStore } from "@/services";
import { useToast } from "@/components/Toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuCheck, LuChevronUp, LuDog, LuLogIn } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/services/hook";
import { useNavigator } from "@/hooks";
import { Combobox, Transition } from "@headlessui/react";

type LoginInputs = {
  mobile_number: string;
  password: string;
  country_code: string;
};

type CountryState = {
  name: string;
  value: string;
  flag: string;
  country: string;
  readonly?: boolean;
};

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userNavigator = useNavigator();

  const user = useAppSelector((state: RootStore) => state.user);

  const [countries, setCountries] = useState<CountryState[]>([
    { name: "", value: "", flag: "Select Country", country: "-" },
    { name: "+66", value: "66", flag: "🇹🇭", country: "TH" },
    { name: "+81", value: "81", flag: "🇯🇵", country: "JP" },
  ]);
  const [country, setCountry] = useState<CountryState>(countries[0]);
  const [query, setQuery] = useState("");
  const filteredCountry =
    query === ""
      ? countries
      : countries.filter((c) =>
          c.name.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const { showToast } = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginInputs>();

  useEffect(() => {
    const user_country = countries.find((v) => v.country == userNavigator?.userNavigator?.user_geo.prov);
    console.log("us: ", user_country);
    if (user_country) {
      setCountry(user_country);
    }

    dispatch(clientUserReset());
    if (user.data && user.isAuthenticated) {
      // console.log("isAuth", user.data);
      router.push("/dashboard");
    }

    if (user.error) {
      showToast(`error: ${user.error}`, { status: "failed" });
    }
  }, [user]);

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    // console.log(data);
    const loginData: Login = {
      mobile_number: data.mobile_number,
      password: data.password,
      country_code: data.country_code,
    };
    dispatch(clientLogin(loginData));
  };

  // const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault()

  //     console.log('form submit...', formData)
  //     dispatch(clientLogin(formData))

  // if (user.error) {
  //     showToast(`${user.error}`, {duration: 3000, status: ToastStatus.failed})
  // }
  // }

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     console.log(event.target)
  //     const { name, value } = event.target
  //     setFormData((prevData) => ({ ...prevData, [name]: value }));
  // }

  // const getSelectValue = (values: SelectOptionValue[]) => {
  //   console.log("values: ", values);
  //   return values;
  // };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="my-2 flex items-center justify-center text-2xl">
          LOGIN ACCOUNT <LuDog className="ml-2" />
        </h2>
        <div className="mb-2 flex space-y-2">
          <label>
            Mobile Number &nbsp;
            <Combobox value={country} onChange={setCountry}>
              <div className="relative my-2">
                <div className="relative w-28 cursor-default overflow-hidden rounded-sm bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                  <Combobox.Input
                    className={"w-full border-none py-1 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"}
                    displayValue={(country: CountryState) => `${country.name}`}
                    // onChange={(event) => setQuery(event.target.value)}
                    readOnly
                    {...register("country_code", { required: "country code field is required" })}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <LuChevronUp className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery("")}
                >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {filteredCountry.length === 0 && query !== "" ? (
                      <div className="relative cursor-default select-none py-2 text-gray-700">Nothing found.</div>
                    ) : (
                      filteredCountry.map((country) => (
                        <Combobox.Option
                          key={country.name}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? "bg-primary-80 text-white" : "text-gray-900"
                            }`
                          }
                          value={country}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                {country.flag} {country.name}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? "text-white" : "text-primary"
                                  }`}
                                >
                                  <LuCheck className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
            <input
              className="rounded-sm text-black"
              type="text"
              {...register("mobile_number", { required: "mobile number field is required", maxLength: 10 })}
            />
            <div className="text-red-500">{errors && errors.country_code?.message}</div>
            <div className="text-red-500">{errors && errors.mobile_number?.message}</div>
          </label>
        </div>
        <div className="flex space-y-2">
          <label>
            Password &nbsp;
            <input
              type="password"
              {...register("password", { required: "password field is required" })}
              className="rounded-sm text-black"
            />
            <div className="text-red-500">{errors && errors.password?.message}</div>
          </label>
        </div>
        {/* <div className="mb-2 space-y-2">
          <Input
            type="text"
            placeholder="mobile"
            register={{ ...register("mobile_number", { required: true, maxLength: 10 }) }}
            icon={<LuPhone />}
          />
          <div>{errors && errors.mobile_number?.message}</div>
        </div>
        <div className="mb-2 space-y-2">
          <Input
            type="password"
            placeholder="password"
            register={{ ...register("password", { required: true }) }}
            icon={<LuLock />}
          />
          <div>{errors && errors.password?.message}</div>
        </div> */}
        <button className="btn-primary mx-auto my-3 flex w-full items-center justify-center" type="submit">
          <LuLogIn className="mr-1" /> Login
        </button>
      </form>
    </div>
  );
};

export default Page;
