import { useEffect, useState } from "react"
import TitleCard from "../components/Cards/TitleCard"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../components/Input/SearchBar"
import { fetchUsers } from "../services/Authentication/usersService"
import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../features/common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../utils/globalConstantUtil'
import { useNavigate } from "react-router-dom"
import { getUsersApi } from "../features/users/userSlice"
import ModalLayout from "../containers/ModalLayout"
import { fetchUserRolesApi } from "../features/roles/roleSlice"
import TrashIcon from "@heroicons/react/24/outline/TrashIcon"
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import EyeIcon from '@heroicons/react/24/outline/EyeIcon'


const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")
    const locationFilters = ["مذکر", "مونث"]
    const SexOptions = useSelector(state => state.sex)

    const nav = useNavigate()
    const dispatch = useDispatch();

    const showFiltersAndApply = (params) => {
        applyFilter(SexOptions.find(a => a.name === params)?.value)
        setFilterParam(params)
    }

    const removeAppliedFilter = () => {
        removeFilter()
        setFilterParam("")
        setSearchText("")
    }

    const navToRegisterUser = () => {
        nav("/register")
    }

    useEffect(() => {
        if (searchText == "") {
            removeAppliedFilter()
        } else {
            applySearch(searchText)
        }
    }, [searchText])

    return (
        <div className="flex items-center justify-between w-full">
            {filterParam != "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2" /></button>}

            <button className="btn  btn-info normal-case" onClick={navToRegisterUser} >کاربر جدید</button>
            <div className="flex">

                <div className="dropdown dropdown-bottom dropdown-end ">
                    <label tabIndex={0} className="btn btn-sm btn-outline"><FunnelIcon className="w-5 mr-2" />فیلتر ها</label>

                    <ul tabIndex={0} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
                        {
                            locationFilters.map((l, k) => {
                                return <li key={k}><a onClick={() => showFiltersAndApply(l)}>{l}</a></li>
                            })
                        }
                        <div className="divider mt-0 mb-0"></div>
                        <li><a onClick={() => removeAppliedFilter()}>حذف فیلتر </a></li>
                    </ul>

                </div>
                <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
            </div>
        </div>

    )
}


function UsersList() {


    const fetchUsersList = () => {

        const response = dispatch(getUsersApi())

        return response
    }
    const fetchUsersRolesList = () => {

        const response = dispatch(fetchUserRolesApi())
        return response
    }

    const dispatch = useDispatch()

    useEffect(() => {
        fetchUsersList()
        fetchUsersRolesList()
    }, [])


    const usersList = useSelector(state => state.users.users)


    const [filteredUsers, setFilteredUsers] = useState()
    const [users, setUsers] = useState()

    useEffect(() => {
        setUsers(usersList)
        setFilteredUsers(usersList)

    }, [usersList])

    const removeFilter = () => {
        setFilteredUsers(users)

    }

    const applyFilter = (params) => {
        console.log(params)
        let filteredTransactions = filteredUsers.filter((t) => { return t.gender == params })
        setFilteredUsers(filteredTransactions)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = filteredUsers.filter((t) => { return t.email.toLowerCase().includes(value.toLowerCase()) || t.userName.toLowerCase().includes(value.toLowerCase()) || t.mobile.toLowerCase().includes(value.toLowerCase()) })
        setFilteredUsers(filteredTransactions)
    }
    const RoleOptions = useSelector(state => state.roles.Roles)
    const SexOptions = useSelector(state => state.sex)



    const deleteCurrentLead = (index, userName) => {
        dispatch(openModal({
            title: " کاربر حذف میشود!", bodyType: MODAL_BODY_TYPES.USER_DELETE,
            extraObject: { message: ` آیا از حذف  کاربر ${userName}  مطمئن هستید؟ `, type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index }
        }))
    }
    const openUserDetailModal = (userName, id) => {
        dispatch(openModal({
            title: "   ",
            extraObject: { userName: { userName }, id: { id } }
            , bodyType: MODAL_BODY_TYPES.USER_DETAIL
        }))
    }

    const openUserUpdateModal = (userName, firstName, lastName, mobile, email, gender, userTypeId) => {
        dispatch(openModal({
            title: "ویرایش کاربر",
            bodyType: MODAL_BODY_TYPES.USER_UPDATE,
            extraObject: {
                userName: { userName }, firstName: { firstName },
                lastName: { lastName }, mobile: { mobile }, email: { email }, gender: { gender }, userTypeId: { userTypeId }
            },
        }))
    }

    const openUserActiveModal = (id, firstName, lastName, isActive) => {
        dispatch(openModal({
            title: "تغییر وضعیت کاربر",
            extraObject: { firstName: { firstName }, id: { id }, lastName: { lastName }, isActive: { isActive } }
            , bodyType: MODAL_BODY_TYPES.USER_STATUS
        }))
    }



    let content

    if (filteredUsers) {

        content = (
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>نام</th>
                        <th>نقش</th>
                        <th>موبایل</th>
                        <th>جنسیت </th>
                        <th>وضعیت </th>
                        <th>ایمیل </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredUsers.map((l, k) => {
                            return (
                                <tr key={k}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12">
                                                    <img src={`https://avatars.dicebear.com/api/male/${l.userName}.svg`} alt="Avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{l.firstName}{" "}{l.lastName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{RoleOptions.find(a => a.id === l.userTypeId)?.name}</td>
                                    <td>{l.mobile}</td>
                                    <td>{SexOptions.find(a => a.value === l.gender)?.name}</td>
                                    <td><button onClick={() => openUserActiveModal(l.id, l.firstName, l.lastName, l.isActive)}
                                        className={l.isActive ? "btn btn-sm btn-success" : "btn btn-sm btn-error"} >{l.isActive ? "فعال" : "غیر فعال"}</button></td>
                                    <td>
                                        {l.email}
                                    </td>
                                    <td>
                                        <div className="btn-group">

                                            <button onClick={() => deleteCurrentLead(l.id, l.userName)} className="btn btn-xs btn-square btn-ghost">
                                                <TrashIcon className="w-5" /></button>
                                            <button onClick={() => openUserUpdateModal(l.userName, l.firstName, l.lastName,
                                                l.mobile, l.email, l.gender, l.userTypeId)} className=" btn btn-xs btn-square btn-ghost">
                                                <PencilSquareIcon className="w-5" /></button>
                                            <button onClick={() => openUserDetailModal(l.userName, l.id)} className=" btn btn-xs btn-square btn-ghost">
                                                <EyeIcon className="w-5" /></button>
                                        </div>



                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )

    } else {
        content = <p>trans is undefined</p>
    }

    return (
        <>

            <TitleCard topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter} />}>

                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    {
                        content
                    }
                </div>
            </TitleCard>
        </>
    )
}


export default UsersList
