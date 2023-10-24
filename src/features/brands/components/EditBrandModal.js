import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { updateBrandsApi } from "../brandSlice"


function EditRoleModal({ closeModal, extraObject }) {

    const { name, id, code } = extraObject

    console.log(name)

    const INITIAL_OBJ = {
        id: id.id,
        name: name.name,
        code: code.code
    }

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [brandObj, setBrandObj] = useState(INITIAL_OBJ)

    const saveNewRole = () => {
        if (brandObj.name.trim() === "") return setErrorMessage("First Name is required!")
        else {
            let newRoleObj = {
                "id": brandObj.id,
                "name": brandObj.name,
                "code": brandObj.code

            }
            console.log(newRoleObj)
            dispatch(updateBrandsApi(newRoleObj))
            dispatch(showNotification({ message: "ویرایش با موفقیت انجام شد!", status: 1 }))
            closeModal()
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setBrandObj({ ...brandObj, [updateType]: value })
    }

    return (
        <>

            <InputText type="text" defaultValue={brandObj.name} updateType="name" containerStyle="mt-4" labelTitle="عنوان" updateFormValue={updateFormValue} />
            <InputText type="text" defaultValue={brandObj.code} updateType="code" containerStyle="mt-4" labelTitle="کد برند" updateFormValue={updateFormValue} />

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>انصراف</button>
                <button className="btn btn-warning px-6" onClick={() => saveNewRole()}>ذخیره</button>
            </div>
        </>
    )
}

export default EditRoleModal