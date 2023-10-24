
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_CLOSE_TYPES } from '../../../utils/globalConstantUtil'
import { deleteLead, deleteUserApi } from '../../users/userSlice'
import { showNotification } from '../../common/headerSlice'

function DeleteModalBody({ extraObject, closeModal }) {

    const dispatch = useDispatch()

    const { message, type, _id, index } = extraObject

    const proceedWithYes = async () => {
        if (type === CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE) {
            // positive response, call api or dispatch redux function
            console.log("delete user modal: ", index)
            dispatch(deleteUserApi(index))
            dispatch(showNotification({ message: "کاربر با موفقیت حذف شد", status: 1 }))
        }
        closeModal()
    }

    return (
        <>
            <p className=' text-xl mt-8 text-center'>
                {message}
            </p>

            <div className="divider mt-10"></div>

            <div className="flex justify-start modal-action mt-3">

                <button className="btn btn-error w-36" onClick={() => proceedWithYes()}>حذف</button>
                <button className="btn btn-outline   " onClick={() => closeModal()}>انصراف</button>

            </div>
        </>
    )
}

export default DeleteModalBody