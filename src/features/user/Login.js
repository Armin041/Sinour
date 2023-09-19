import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import { loginUserService } from '../../services/Authentication/loginUserService'

function Login() {

    const INITIAL_LOGIN_OBJ = {
        userName: "",
        password: ""
    }

    const nav = useNavigate()


    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)

    const submitForm = async (e) => {
        e.preventDefault()
        setErrorMessage("")

        // if(loginObj.emailId.trim() === "")return setErrorMessage("Email Id is required! (use any value)")
        // if(loginObj.password.trim() === "")return setErrorMessage("Password is required! (use any value)")
        // else{
        setLoading(true)
        try {
            const response = await loginUserService(JSON.stringify(loginObj))
            const { tkn } = response.data.data;

            if (response.status === 200) {
                localStorage.setItem("token", tkn)
                setLoading(false)
                // window.location.href = '/app/welcome'
                nav('/app/dashboard')
            } else {
                setErrorMessage("Login failed. Please check your credentials.");
                console.log(errorMessage)
            }
        } catch (error) {
            console.log(error)
            setErrorMessage("An error occurred while logging in.");
        }
        setLoading(false)

        // }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>ورود به حساب کاربری</h2>
                        <form onSubmit={(e) => submitForm(e)}>

                            <div className="mb-4">

                                <InputText type="userName" defaultValue={loginObj.userName} updateType="userName" containerStyle="mt-4" labelTitle="نام کاربری" updateFormValue={updateFormValue} />

                                <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="رمز عبور" updateFormValue={updateFormValue} />

                            </div>

                            <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">رمز عبور خود را فراموش کرده اید؟</span></Link>
                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>ورود</button>

                            <div className='text-center mt-4'>برای اضافه کردن کاربر <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">کلیک کنید</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login