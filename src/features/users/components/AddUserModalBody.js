import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewUser } from "../userSlice"
import SelectBox from "../../../components/Input/SelectBox"

const INITIAL_User_OBJ = {
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
    mobile: "",
    gender: 1,
    userTypeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}

function AddUserModalBody({ closeModal }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [userObj, setUserObj] = useState(INITIAL_User_OBJ)

    const options = useSelector(state => state.sex)
    const RoleOptions = useSelector(state => state.roles)

    const saveNewUser = () => {
        if (userObj.userName.trim() === "") return setErrorMessage("First Name is required!")
        else if (userObj.email.trim() === "") return setErrorMessage("Email id is required!")
        else {
            let newLeadObj = {
                "username": userObj.userName,
                "password": userObj.password,
                "confirmPassword": userObj.confirmPassword,
                "email": userObj.email,
                "mobile": userObj.mobile,
                "gender": userObj.gender,
                "userTypeId": userObj.userTypeId,

            }
            dispatch(addNewUser({ newLeadObj }))
            dispatch(showNotification({ message: "New Lead Added!", status: 1 }))
            closeModal()
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setUserObj({ ...userObj, [updateType]: value })
    }
    const updateSexValue = ({ updateType, value }) => {
        setErrorMessage("")
        setUserObj({ ...userObj, [updateType]: Number(value) })
    }

    return (
        <>



            <InputText defaultValue={userObj.userName} updateType="userName" containerStyle="mt-4" labelTitle="نام کاربری" updateFormValue={updateFormValue} />

            <InputText defaultValue={userObj.email} updateType="email" containerStyle="mt-4" labelTitle="ایمیل" updateFormValue={updateFormValue} />

            <InputText defaultValue={userObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="رمز عبور" updateFormValue={updateFormValue} />
            <InputText defaultValue={userObj.confirmPassword} type="password" updateType="confirmPassword" containerStyle="mt-4" labelTitle="تکرار رمز عبور" updateFormValue={updateFormValue} />
            <InputText defaultValue={userObj.mobile} type="text" updateType="mobile" containerStyle="mt-4" labelTitle=" موبایل " updateFormValue={updateFormValue} />
            <SelectBox
                labelTitle="جنسیت"
                defaultValue={userObj.gender}
                containerStyle="my-container w-full"
                placeholder="انتخاب کنید"
                labelStyle="my-label"
                options={options}
                updateType="gender"
                updateFormValue={updateSexValue}
            />
            <SelectBox
                labelTitle="نقش"
                defaultValue={userObj.userTypeId}
                containerStyle="my-container w-full"
                placeholder="انتخاب کنید"
                labelStyle="my-label"
                options={RoleOptions}
                updateType="userTypeId"
                updateFormValue={updateFormValue}
            />



            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>انصراف</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewUser()}>ذخیره</button>
            </div>
        </>
    )
}

export default AddUserModalBody