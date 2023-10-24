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
import { fetchOporationTypeApi } from "../oprationTypeSlice"


const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")

    const dispatch = useDispatch();

    const openAddOporationTypeModal = () => {
        dispatch(openModal({ title: "اضافه کردن تخصص جدید", bodyType: MODAL_BODY_TYPES.OPORATION_TYPE_ADD }))
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
            <button className="btn  btn-info normal-case" onClick={() => openAddOporationTypeModal()} >تخصص جدید </button>
            <div className="flex">
                <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
            </div>
        </div>

    )
}


function OporationTypeList() {

    const dispatch = useDispatch()

    const fetchOporationTypes = () => {

        const response = dispatch(fetchOporationTypeApi())
        return response
    }


    useEffect(() => {
        fetchOporationTypes()
    }, [])
    const oporationTypes = useSelector(state => state.oporationType.OporationType)


    const [filteredOporationTypes, setFilteredOporationTypes] = useState()
    const [oporationType, setopOrationType] = useState()

    console.log(oporationTypes)
    console.log(filteredOporationTypes)

    useEffect(() => {
        setopOrationType(oporationTypes)
        setFilteredOporationTypes(oporationTypes)

    }, [oporationTypes])

    const removeFilter = () => {
        setFilteredOporationTypes(oporationType)

    }

    const applyFilter = (params) => {
        console.log(params)
        let filteredTransactions = filteredOporationTypes.filter((t) => { return t.gender == params })
        setFilteredOporationTypes(filteredTransactions)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = filteredOporationTypes.filter((t) => { return t.name.toLowerCase().includes(value.toLowerCase()) })
        setFilteredOporationTypes(filteredTransactions)
    }


    const deleteCurrentLead = (index, name) => {
        dispatch(openModal({
            title: " نقش حذف میشود!", bodyType: MODAL_BODY_TYPES.OPORATION_TYPE_DELETE,
            extraObject: { message: ` آیا از حذف  نقش ${name}  مطمئن هستید؟ `, type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index }
        }))
    }

    const openOporationTypeUpdateModal = (name, id, oporationType) => {
        dispatch(openModal({
            title: "ویرایش تخصص",
            bodyType: MODAL_BODY_TYPES.OPORATION_TYPE_UPDATE,
            extraObject: { name: { name }, id: { id }, oporationType: { oporationType } },
        }))
    }



    let content

    if (filteredOporationTypes) {

        content = (
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>عنوان</th>
                        <th>تعداد</th>
                        <th>اعمال</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredOporationTypes.map((l, k) => {
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
                                    <td>
                                        10
                                    </td>
                                    <td>
                                        <div className="btn-group">

                                            <button onClick={() => deleteCurrentLead(l.id, l.name)} className="btn btn-xs btn-square btn-ghost">
                                                <TrashIcon className="w-5" /></button>
                                            <button onClick={() => openOporationTypeUpdateModal(l.name, l.id, l)} className=" btn btn-xs btn-square btn-ghost">
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


export default OporationTypeList