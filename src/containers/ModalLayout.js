import { useEffect } from 'react'
import { MODAL_BODY_TYPES } from '../utils/globalConstantUtil'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../features/common/modalSlice'
import AddUserModalBody from '../features/users/components/AddUserModalBody'
import DeleteModalBody from '../features/users/components/DeleteUserModal'
import UserDetails from '../features/users/components/UsersDetails'
import UpdateUserModalBody from '../features/users/components/UpdateUserModalBody'
import AddNewRoleModal from '../features/roles/components/AddNewRoleModal'
import DeleteRoleModal from '../features/roles/components/DeleteRoleModal'
import EditRoleModal from '../features/roles/components/EditRoleModal'
import AddOporationTypeModal from '../features/OporationType/components/AddOporationTypeModal'
import DeleteOporationTypeModal from '../features/OporationType/components/DeleteOporationTypeModal'
import EditOporationTypeModal from '../features/OporationType/components/EditOporationTypeModal'
import AddOporatorModal from '../features/oporators/components/AddOporatorModal'
import AddBrandModal from '../features/brands/components/AddBrandModal'
import DeleteBrandModal from '../features/brands/components/DeleteBrandModal'
import EditBrandModal from '../features/brands/components/EditBrandModal'
import ChangeUserStatus from '../features/users/components/ChangeUserStatus'


function ModalLayout() {


    const { isOpen, bodyType, size, extraObject, title } = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const close = (e) => {
        dispatch(closeModal(e))
    }

    return (
        <>
            {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
                <div className={`modal-box  ${size === 'lg' ? 'max-w-5xl' : ''}`}>
                    <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => close()}>✕</button>
                    <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>


                    {/* Loading modal body according to different modal type */}
                    {
                        {
                            // [MODAL_BODY_TYPES.LEAD_ADD_NEW]: <AddLeadModalBody closeModal={close} extraObject={extraObject} />,
                            [MODAL_BODY_TYPES.LEAD_ADD_NEW]: <AddUserModalBody closeModal={close} extraObject={extraObject} />,
                            [MODAL_BODY_TYPES.USER_UPDATE]: <UpdateUserModalBody closeModal={close} extraObject={extraObject} />,
                            [MODAL_BODY_TYPES.USER_DELETE]: <DeleteModalBody extraObject={extraObject} closeModal={close} />,
                            [MODAL_BODY_TYPES.USER_DETAIL]: <UserDetails extraObject={extraObject} closeModal={close} />,
                            [MODAL_BODY_TYPES.USER_STATUS]: <ChangeUserStatus extraObject={extraObject} closeModal={close} />,
                            [MODAL_BODY_TYPES.ROLES_ADD_NEW]: <AddNewRoleModal extraObject={extraObject} closeModal={close} />,
                            [MODAL_BODY_TYPES.CONFIRMATION]: <DeleteRoleModal extraObject={extraObject} closeModal={close} />,
                            [MODAL_BODY_TYPES.ROLES_UPDATE]: <EditRoleModal extraObject={extraObject} closeModal={close} />,
                            [MODAL_BODY_TYPES.OPORATION_TYPE_ADD]: <AddOporationTypeModal extraObject={extraObject} closeModal={close} />,
                            [MODAL_BODY_TYPES.OPORATION_TYPE_DELETE]: <DeleteOporationTypeModal extraObject={extraObject} closeModal={close} />,
                            [MODAL_BODY_TYPES.OPORATION_TYPE_UPDATE]: <EditOporationTypeModal extraObject={extraObject} closeModal={close} />,
                            [MODAL_BODY_TYPES.OPORATOR_ADD]: <AddOporatorModal extraObject={extraObject} closeModal={close} />,
                            [MODAL_BODY_TYPES.BRANDS_ADD_NEW]: <AddBrandModal extraObject={extraObject} closeModal={close} />,
                            [MODAL_BODY_TYPES.BRANDS_DELETE]: <DeleteBrandModal extraObject={extraObject} closeModal={close} />,
                            [MODAL_BODY_TYPES.BRANDS_UPDATE]: <EditBrandModal extraObject={extraObject} closeModal={close} />,
                            [MODAL_BODY_TYPES.DEFAULT]: <div></div>
                        }[bodyType]
                    }
                </div>
            </div>
        </>
    )
}

export default ModalLayout