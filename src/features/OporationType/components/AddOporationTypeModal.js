import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addOporationTypeApi } from "../oprationTypeSlice"

const INITIAL_OPORATIONTYPE_OBJ = {
    name: "",
}

function AddOporationTypeModal({ closeModal }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [oporationTypes, setOporationTypes] = useState(INITIAL_OPORATIONTYPE_OBJ)


    const saveNewRole = () => {
        if (oporationTypes.name.trim() === "") return setErrorMessage("First Name is required!")
        else {
            let newRoleObj = {

                "name": oporationTypes.name,

            }
            dispatch(addOporationTypeApi(newRoleObj))
            dispatch(showNotification({ message: "تخصص جدید با موفقیت اضافه شد!", status: 1 }))
            closeModal()
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setOporationTypes({ ...oporationTypes, [updateType]: value })
    }

    return (
        <>

            <InputText type="text" defaultValue={oporationTypes.name} updateType="name" containerStyle="mt-4" labelTitle="عنوان" updateFormValue={updateFormValue} />

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>انصراف</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewRole()}>ذخیره</button>
            </div>
        </>
    )
}

export default AddOporationTypeModal