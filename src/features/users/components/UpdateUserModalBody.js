import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewUser, editUserApi } from "../userSlice"
import SelectBox from "../../../components/Input/SelectBox"
import RoleSelectBox from "../../../components/Input/RoleSelectBox"



function UpdateUserModalBody({ closeModal, extraObject }) {
    const { userName, firstName, lastName, mobile, email, gender, userTypeId } = extraObject

    const INITIAL_User_OBJ = {
        userName: userName.userName,
        firstName: firstName.firstName,
        lastName: lastName.lastName,
        password: "",
        confirmPassword: "",
        email: email.email,
        mobile: mobile.mobile,
        gender: gender.gender,
        userTypeId: userTypeId.userTypeId
    }


    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [userObj, setUserObj] = useState(INITIAL_User_OBJ)

    const options = useSelector(state => state.sex)
    const RoleOptions = useSelector(state => state.roles.Roles)

    const saveNewUser = () => {
        if (userObj.userName.trim() === "") return setErrorMessage("First Name is required!")
        else if (userObj.email.trim() === "") return setErrorMessage("Email id is required!")
        else {
            let newLeadObj = {
                "username": userObj.userName,
                "firstName": userObj.firstName,
                "lastName": userObj.lastName,
                "password": userObj.password,
                "confirmPassword": userObj.confirmPassword,
                "email": userObj.email,
                "mobile": userObj.mobile,
                "gender": userObj.gender,
                "userTypeId": userObj.userTypeId,

            }
            console.log(newLeadObj)
            dispatch(editUserApi(newLeadObj))
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


            <div className='grid grid-cols-2'>
                <InputText defaultValue={userObj.firstName} updateType="firstName" containerStyle="mt-4" labelTitle="نام " updateFormValue={updateFormValue} />
                <InputText defaultValue={userObj.lastName} updateType="lastName" containerStyle="mt-4 ml-2" labelTitle="نام خانوادگی" updateFormValue={updateFormValue} />

            </div>

            <div className='grid grid-cols-2'>
                <InputText defaultValue={userObj.userName} updateType="userName" containerStyle="mt-4" labelTitle="نام کاربری" updateFormValue={updateFormValue} />

                <InputText defaultValue={userObj.mobile} type="text" updateType="mobile" containerStyle="mt-4 ml-2" labelTitle=" موبایل " updateFormValue={updateFormValue} />

            </div>


            <InputText defaultValue={userObj.email} updateType="email" containerStyle="mt-4" labelTitle="ایمیل" updateFormValue={updateFormValue} />
            {/* 
            <InputText defaultValue={userObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="رمز عبور" updateFormValue={updateFormValue} />
            <InputText defaultValue={userObj.confirmPassword} type="password" updateType="confirmPassword" containerStyle="mt-4" labelTitle="تکرار رمز عبور" updateFormValue={updateFormValue} />
            */}

            <div className='grid grid-cols-2'>

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
                <RoleSelectBox
                    labelTitle="نقش"
                    defaultValue={userObj.userTypeId}
                    containerStyle="my-container w-full ml-2"
                    placeholder="انتخاب کنید"
                    labelStyle="my-label"
                    options={RoleOptions}
                    updateType="userTypeId"
                    updateFormValue={updateFormValue}
                />
            </div>

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="flex justify-start modal-action">
                <button className="btn btn-warning px-6" onClick={() => saveNewUser()}>ذخیره</button>
                <button className="btn btn-ghost" onClick={() => closeModal()}>انصراف</button>
            </div>
        </>
    )
}

export default UpdateUserModalBody