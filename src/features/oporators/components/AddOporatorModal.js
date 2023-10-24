import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import InputText from '../../../components/Input/InputText'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import SelectBox from "../../../components/Input/SelectBox"
import RoleSelectBox from "../../../components/Input/RoleSelectBox"
import { addOporatorsApi } from "../oporatorsSlice"

const INITIAL_OPORATOR_OBJ = {
    firstName: "",
    lastName: "",
    nationalCode: "",
    mobile: "",
    gender: 1,
    description: "",
    operationType: ""
}

function AddOporatorModal({ closeModal }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [oporatorsObj, setOporatorsObj] = useState(INITIAL_OPORATOR_OBJ)

    const options = useSelector(state => state.sex)
    const oporationTypes = useSelector(state => state.oporationType.OporationType)

    const saveNewUser = () => {
        if (oporatorsObj.firstName.trim() === "") return setErrorMessage("First Name is required!")
        else if (oporatorsObj.lastName.trim() === "") return setErrorMessage("Email id is required!")
        else {
            let newOporatorObj = {
                "firstName": oporatorsObj.firstName,
                "lastName": oporatorsObj.lastName,
                "nationalCode": oporatorsObj.nationalCode,
                "mobile": oporatorsObj.mobile,
                "gender": oporatorsObj.gender,
                "description": oporatorsObj.description,
                "operationType": oporatorsObj.operationType,

            }
            console.log(newOporatorObj)
            dispatch(addOporatorsApi(newOporatorObj))
            dispatch(showNotification({ message: "اپراتور جدید با موفقیت اضافه شد!", status: 1 }))
            closeModal()
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        console.log(value)
        setOporatorsObj({ ...oporatorsObj, [updateType]: value })
    }
    const updateSexValue = ({ updateType, value }) => {
        setErrorMessage("")
        setOporatorsObj({ ...oporatorsObj, [updateType]: Number(value) })
    }

    return (
        <>


            <div className="grid grid-cols-2">

                <InputText defaultValue={oporatorsObj.firstName} updateType="firstName" containerStyle="mt-4" labelTitle="نام " updateFormValue={updateFormValue} />

                <InputText defaultValue={oporatorsObj.lastName} updateType="lastName" containerStyle="mt-4 ml-2" labelTitle="نام خانوادگی" updateFormValue={updateFormValue} />
            </div>


            <div className="grid grid-cols-2">

                <InputText defaultValue={oporatorsObj.nationalCode} type="text" updateType="nationalCode" containerStyle="mt-4" labelTitle="کد ملی" updateFormValue={updateFormValue} />
                <InputText defaultValue={oporatorsObj.mobile} type="text" updateType="mobile" containerStyle="mt-4 ml-2" labelTitle="تلفن همراه" updateFormValue={updateFormValue} />
            </div>
            <TextAreaInput defaultValue={oporatorsObj.description} type="text" updateType="description" containerStyle="mt-4" labelTitle=" توضیحات " updateFormValue={updateFormValue} />


            <div className="grid grid-cols-2">


                <SelectBox
                    labelTitle="جنسیت"
                    defaultValue={oporatorsObj.gender}
                    containerStyle="my-container w-full"
                    placeholder="انتخاب کنید"
                    labelStyle="my-label"
                    options={options}
                    updateType="gender"
                    updateFormValue={updateSexValue}
                />
                <RoleSelectBox
                    labelTitle="تخصص"
                    defaultValue={oporatorsObj.operationType}
                    containerStyle="my-container ml-2 w-full"
                    placeholder="انتخاب کنید"
                    labelStyle="my-label"
                    options={oporationTypes}
                    updateType="operationType"
                    updateFormValue={updateFormValue}
                />

            </div>


            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="flex justify-start modal-action">
                <button className="btn btn-primary px-6" onClick={() => saveNewUser()}>ذخیره</button>
                <button className="btn btn-ghost" onClick={() => closeModal()}>انصراف</button>
            </div>
        </>
    )
}

export default AddOporatorModal