import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { editOporationTypeApi } from "../oprationTypeSlice"


function EditOporationTypeModal({ closeModal, extraObject }) {

    const { name, id, oporationType } = extraObject

    console.log(oporationType)

    const INITIAL_OPORATIONTYPE_OBJ = {
        id: oporationType.oporationType.id,
        name: oporationType.oporationType.name
    }


    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [oporationTypes, setOporationTypes] = useState(INITIAL_OPORATIONTYPE_OBJ)


    const saveNewOporationType = () => {
        if (oporationTypes.name.trim() === "") return setErrorMessage("First Name is required!")
        else {
            let newOporationTypeObj = {
                "id": oporationTypes.id,
                "name": oporationTypes.name,

            }
            console.log(newOporationTypeObj)
            dispatch(editOporationTypeApi(newOporationTypeObj))
            dispatch(showNotification({ message: "ویرایش با موفقیت انجام شد!", status: 1 }))
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
                <button className="btn btn-warning px-6" onClick={() => saveNewOporationType()}>ذخیره</button>
            </div>
        </>
    )
}

export default EditOporationTypeModal