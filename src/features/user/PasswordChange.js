import { useState } from "react"
import InputText from '../../components/Input/InputText'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { changePasswordApi } from "./passwordChangeSlice"


const PasswordChange = () => {


    const INITIAL_OBJ = {
        oldPass: "",
        newPass: "",
        confirmNewPass: ""

    }

    const errors = useSelector(state => state.passChange.errors)
    const [errorMessage, setErrorMessage] = useState(errors)
    useEffect(() => {
        setErrorMessage(errors)
    }, [errors])


    const dispatch = useDispatch()

    const isChanging = useSelector(state => state.passChange.isChangingPassword)

    const [passObj, setPassObj] = useState(INITIAL_OBJ)

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setPassObj({ ...passObj, [updateType]: value })
    }


    const handleChangePassword = async () => {

        try {
            let newObj = {
                "currentPassword": passObj.oldPass,
                "newPassword": passObj.newPass,
                "confirmPassword": passObj.confirmNewPass
            };

            await dispatch(changePasswordApi(newObj));
        } catch (error) {

            console.error("Error changing password:", error);
            setErrorMessage("خطایی در هنگام تغییر رمز عبور رخ داده است");
        }
    }

    return (
        <>

            <div className="flex justify-center items-center w-full ">
                <div className="w-80">
                    <h1 className="text-center text-2xl">تغییر رمز عبور</h1>

                    <InputText type="text" defaultValue={passObj.oldPass} updateType="oldPass" containerStyle="mt-4 w-30" labelTitle="رمز عبور فعلی" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={passObj.newPass} updateType="newPass" containerStyle="mt-4" labelTitle="رمز عبور جدید" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={passObj.confirmNewPass} updateType="confirmNewPass" containerStyle="mt-4 mb-6" labelTitle="تکرار رمز عبور" updateFormValue={updateFormValue} />

                    {errorMessage && (
                        <p style={{ color: 'red' }}>
                            {Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage}
                        </p>
                    )}


                    <button type="submit" className="btn btn-primary mt-2 w-full"
                        onClick={handleChangePassword} disabled={isChanging}>
                        {isChanging ? 'در حال تغییر  ...' : 'تغییر رمز عبور'}
                    </button>

                    {/* <button type="submit" className={"btn mt-2 w-full btn-primary" + (isChanging ? " loading" : "")}>تغییر رمز عبور</button> */}
                </div>

            </div>

        </>
    );
}

export default PasswordChange;