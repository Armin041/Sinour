import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import { registerUserService } from '../../services/Authentication/registerUserService'
import SelectBox from '../../components/Input/SelectBox'
import { useSelector } from 'react-redux'

function Register() {

    const INITIAL_REGISTER_OBJ = {
        userName: "",
        password: "",
        confirmPassword: "",
        email: "",
        mobile: "",
        gender: 1,
        userTypeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }

    const options = useSelector(state => state.sex)
    const RoleOptions = useSelector(state => state.roles)

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ)

    const nav = useNavigate()


    const submitForm = async (e) => {
        e.preventDefault()
        setErrorMessage("")

        // if (registerObj.name.trim() === "") return setErrorMessage("Name is required! (use any value)")
        // if (registerObj.email.trim() === "") return setErrorMessage("Email Id is required! (use any value)")
        // if (registerObj.password.trim() === "") return setErrorMessage("Password is required! (use any value)")
        // if (registerObj.confirmPassword.trim() === "") return setErrorMessage("confirmPassword is required! (use any value)")
        // if (registerObj.mobile.trim() === "") return setErrorMessage("mobile is required! (use any value)")
        // if (registerObj.gender.trim() === "") return setErrorMessage("gender is required! (use any value)")

        // else {
        setLoading(true)

        try {
            console.log(registerObj)
            const response = await registerUserService(JSON.stringify(registerObj))

            console.log(response)
            if (response.status === 200) {
                setLoading(false)
                nav('/app/users')
            } else {
                <p>error</p>
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)

        // }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setRegisterObj({ ...registerObj, [updateType]: value })
    }

    const updateSexValue = ({ updateType, value }) => {
        setErrorMessage("")
        setRegisterObj({ ...registerObj, [updateType]: Number(value) })
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">

                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>ثبت کاربر جدید</h2>
                        <form onSubmit={(e) => submitForm(e)}>

                            <div className="mb-4">

                                <InputText defaultValue={registerObj.userName} updateType="userName" containerStyle="mt-4" labelTitle="نام کاربری" updateFormValue={updateFormValue} />

                                <InputText defaultValue={registerObj.email} updateType="email" containerStyle="mt-4" labelTitle="ایمیل" updateFormValue={updateFormValue} />

                                <InputText defaultValue={registerObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="رمز عبور" updateFormValue={updateFormValue} />
                                <InputText defaultValue={registerObj.confirmPassword} type="password" updateType="confirmPassword" containerStyle="mt-4" labelTitle="تکرار رمز عبور" updateFormValue={updateFormValue} />
                                <InputText defaultValue={registerObj.mobile} type="text" updateType="mobile" containerStyle="mt-4" labelTitle=" موبایل " updateFormValue={updateFormValue} />
                                <SelectBox
                                    labelTitle="جنسیت"
                                    defaultValue={registerObj.gender}
                                    containerStyle="my-container w-full"
                                    placeholder="انتخاب کنید"
                                    labelStyle="my-label"
                                    options={options}
                                    updateType="gender"
                                    updateFormValue={updateSexValue}
                                />
                                <SelectBox
                                    labelTitle="نقش"
                                    defaultValue={registerObj.userTypeId}
                                    containerStyle="my-container w-full"
                                    placeholder="انتخاب کنید"
                                    labelStyle="my-label"
                                    options={RoleOptions}
                                    updateType="userTypeId"
                                    updateFormValue={updateFormValue}
                                />
                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>ثبت کاربر</button>

                            <div className='text-center mt-4'> برای ورود <Link to="/login">
                                <span className="inline-block  hover:text-primary hover:underline 
                                    hover:cursor-pointer transition duration-200">
                                    کلیک کنید
                                </span></Link>
                            </div>
                        </form>
                    </div>
                    <div className=''>
                        <LandingIntro />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register