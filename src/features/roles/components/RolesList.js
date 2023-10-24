import { useEffect, useState } from "react"
import TitleCard from "../../../components/Cards/TitleCard"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from '../../../components/Input/SearchBar'
import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../../common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../../utils/globalConstantUtil'
import { useNavigate } from "react-router-dom"
import { getUsersApi } from "../../users/userSlice"
import { fetchUserRolesApi } from "../../roles/roleSlice"
import TrashIcon from "@heroicons/react/24/outline/TrashIcon"
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import EyeIcon from '@heroicons/react/24/outline/EyeIcon'


const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")

    const dispatch = useDispatch();

    const openAddRoleModal = () => {
        dispatch(openModal({ title: "اضافه کردن نقش جدید", bodyType: MODAL_BODY_TYPES.ROLES_ADD_NEW }))
    }



    const removeAppliedFilter = () => {
        removeFilter()
        setFilterParam("")
        setSearchText("")
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
            <button className="btn  btn-info normal-case" onClick={() => openAddRoleModal()} >نقش جدید </button>
            <div className="flex">
                <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
            </div>
        </div>

    )
}


function RolesList() {


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
    const RoleOptions = useSelector(state => state.roles.Roles)
    const usersList = useSelector(state => state.users.users)


    const [filteredRoles, setFilteredRoles] = useState()
    const [roles, setRoles] = useState()

    useEffect(() => {
        setRoles(RoleOptions)
        setFilteredRoles(RoleOptions)

    }, [RoleOptions])

    const removeFilter = () => {
        setFilteredRoles(roles)

    }

    const applyFilter = (params) => {
        console.log(params)
        let filteredTransactions = filteredRoles.filter((t) => { return t.gender == params })
        setFilteredRoles(filteredTransactions)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = filteredRoles.filter((t) => { return t.name.toLowerCase().includes(value.toLowerCase()) })
        setFilteredRoles(filteredTransactions)
    }


    const deleteCurrentLead = (index, name) => {
        dispatch(openModal({
            title: " نقش حذف میشود!", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: ` آیا از حذف  نقش ${name}  مطمئن هستید؟ `, type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index }
        }))
    }

    const openRoleUpdateModal = (name, id, role) => {
        dispatch(openModal({
            title: "ویرایش نقش",
            bodyType: MODAL_BODY_TYPES.ROLES_UPDATE,
            extraObject: { name: { name }, id: { id }, role: { role } },
        }))
    }

    const arr = []

    // arr = "597ecca8-95d4-4ed9-8aff-09a5842eeea7" === usersList.userTypeId

    console.log(usersList)
    console.log(arr.length)

    let content

    if (filteredRoles) {

        content = (
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>عنوان</th>
                        <th>تعداد </th>
                        <th>اعمال</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredRoles.map((l, k) => {


                            return (
                                <tr key={k}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            {/* <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12">
                                                    <img src={`https://avatars.dicebear.com/api/male/${l.id}.svg`} alt="Avatar" />
                                                </div>
                                            </div> */}
                                            <div>
                                                <div className="font-bold">{l.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    {/* <td>{RoleOptions.data.find(a => a.id === l.userTypeId)?.name}</td>
                                    <td>{l.mobile}</td>
                                    <td>{SexOptions.find(a => a.value === l.gender)?.name}</td>
                                    <td><div className="badge badge-success">فعال</div></td>
                                    <td>
                                        {l.email}
                                    </td> */}
                                    <td>
                                        <div className="badge badge-info">
                                            {
                                                usersList.map((a) => {
                                                    arr.push(a.userTypeId === l.id)
                                                })
                                            }
                                            {
                                                arr.length
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        <div className="btn-group">

                                            <button onClick={() => deleteCurrentLead(l.id, l.name)} className="btn btn-xs btn-square btn-ghost">
                                                <TrashIcon className="w-5" /></button>
                                            <button onClick={() => openRoleUpdateModal(l.name, l.id, l)} className=" btn btn-xs btn-square btn-ghost">
                                                <PencilSquareIcon className="w-5" /></button>
                                            {/* <button onClick={() => openUserDetailModal(l.name)} className=" btn btn-xs btn-square btn-ghost">
                                                <EyeIcon className="w-5" /></button> */}
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


export default RolesList