import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addRoleApi } from "../roleSlice"

const INITIAL_ROLE_OBJ = {
    name: "",
}

function AddNewRoleModal({ closeModal }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [roleObj, setRoleObj] = useState(INITIAL_ROLE_OBJ)


    const saveNewRole = () => {
        if (roleObj.name.trim() === "") return setErrorMessage("First Name is required!")
        else {
            let newRoleObj = {

                "name": roleObj.name,

            }
            dispatch(addRoleApi(newRoleObj))
            dispatch(showNotification({ message: "نقش جدید با موفقیت اضافه شد!", status: 1 }))
            closeModal()
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setRoleObj({ ...roleObj, [updateType]: value })
    }

    return (
        <>

            <InputText type="text" defaultValue={roleObj.name} updateType="name" containerStyle="mt-4" labelTitle="عنوان" updateFormValue={updateFormValue} />

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>انصراف</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewRole()}>ذخیره</button>
            </div>
        </>
    )
}

export default AddNewRoleModal