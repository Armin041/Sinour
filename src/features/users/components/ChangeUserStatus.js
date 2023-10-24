
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_CLOSE_TYPES } from '../../../utils/globalConstantUtil'
import { ChangeUserStatusApi, deleteLead, deleteUserApi } from '../userSlice'
import { showNotification } from '../../common/headerSlice'

function ChangeUserStatus({ extraObject, closeModal }) {

    const { id, firstName, lastName, isActive } = extraObject

    const INITIAL_OBJ = {
        id: id.id,
        activeStatus: isActive.isActive,
    }

    // const [statusObj, setStatusObj] = useState(INITIAL_OBJ)

    const dispatch = useDispatch()
    const proceedWithYes = async () => {

        let newStatusObj = {
            "id": id.id,
            "activeStatus": !isActive.isActive,
        }
        // positive response, call api or dispatch redux function
        dispatch(ChangeUserStatusApi(newStatusObj))
        dispatch(showNotification({ message: "وضعیت کاربر با موفقیت تغییر یافت", status: 1 }))

        closeModal()
    }

    return (
        <>
            <p className=' text-xl mt-8 text-center'>
                {isActive.isActive ? `کاربر ${firstName.firstName}${" "}${lastName.lastName} غیر فعال میشود` : `کاربر ${firstName.firstName}${" "}${lastName.lastName} فعال میشود`}
            </p>

            <div className="divider mt-10"></div>

            <div className="flex justify-start modal-action mt-3">

                <button className={isActive.isActive ? "btn btn-error w-36" : "btn btn-success w-36"} onClick={() => proceedWithYes()}>{isActive.isActive ? "غیرفعال کردن" : "فعال کردن"}</button>
                <button className="btn btn-outline   " onClick={() => closeModal()}>انصراف</button>

            </div>
        </>
    )
}

export default ChangeUserStatus