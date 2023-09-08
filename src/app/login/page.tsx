"use client"
import { HTMLAttributes, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Login, clientLogin } from "@/services/user"
import { RootStore } from "@/services"
import { ToastStatus, useToast } from "@/components/Toast"
import Select, { SelectOptionValue } from "@/components/Select"
import { SubmitHandler, useForm } from "react-hook-form"
import Input from "@/components/Input"
import { LuAirplay, LuDog, LuLock, LuLogIn, LuPhone } from "react-icons/lu"
import { useRouter } from "next/navigation"

type LoginInputs = {
    mobile_number: string
    password: string
}

const Page = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const user = useSelector((state: RootStore) => state.user)
    const [formData, setFormData] = useState<Login>({mobile_number: 0, password: ''})
    const { showToast, closeToast } = useToast()
    const { handleSubmit, register, setError, formState: { errors } } = useForm<LoginInputs>()

    const options: SelectOptionValue[] = [
        {key: 'a', value: '1st Pallete', rgb: ['19, 128, 134', '83, 70, 102']}, 
        {key: 'b', value: '2nd Pallete', rgb: ['238, 180, 98', '205, 118, 114']}
    ]

    useEffect(() => {
        setError("mobile_number", {type: "required", message: "mobile field is required"})
        setError("password", {type: "required", message: "password field is required"})

        console.log(user)
        if (user.data && user.isAuthenticated) {
            console.log('isAuth', user.data)
            router.push('/dashboard')
        }
    
        if (user.error) {
            console.log('error: ', user.error)
            showToast(`error: ${user.error}`, {status: "failed"})
        }

    }, [user])

    const onSubmit: SubmitHandler<LoginInputs> = (data) => {
        console.log(data)

        const loginData: Login = {
            mobile_number: parseInt(data.mobile_number),
            password: data.password
        }
        dispatch(clientLogin(loginData))
    }

    // const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()

    //     console.log('form submit...', formData)
    //     dispatch(clientLogin(formData))

    //     if (user.error) {
    //         showToast(`${user.error}`, {duration: 3000, status: ToastStatus.failed})
    //     }
    // }
    

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log(event.target)
    //     const { name, value } = event.target
    //     setFormData((prevData) => ({ ...prevData, [name]: value }));
    // }

    const getSelectValue = (values: SelectOptionValue[]) => {
        console.log('values: ', values)
        return values
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("mobile_number", { required: true, maxLength: 10 })}
                />
                <div>{errors && errors.mobile_number?.message}</div>
                <input 
                    type="password"
                    {...register("password", {required: true})}
                />
                <div>{errors && errors.password?.message}</div>
                <h2 className="flex justify-center my-2 items-center">LOGIN ACCOUNT <LuDog className="ml-2" /></h2>
                {/* <Input type="text" placeholder="mobile" {...register("mobile_number", {required: true, maxLength: 10})} icon={<LuPhone />} />
                <Input type="password" placeholder="password" {...register("password", {required: true })} icon={<LuLock />} /> */}
                <button className="flex btn-primary mx-auto my-3 items-center" type="submit">
                   <LuLogIn className="mr-1" /> Login
                </button>
            </form>
        </div>
    )
}

export default Page