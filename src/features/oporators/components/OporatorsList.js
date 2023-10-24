import { useEffect, useState } from "react"
import TitleCard from "../../../components/Cards/TitleCard"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../../components/Input/SearchBar"
import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../../common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../../utils/globalConstantUtil'
import { useNavigate } from "react-router-dom"
import TrashIcon from "@heroicons/react/24/outline/TrashIcon"
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import EyeIcon from '@heroicons/react/24/outline/EyeIcon'
import { fetchOporatorsApi } from "../oporatorsSlice"
import { fetchOporationTypeApi } from "../../OporationType/oprationTypeSlice"


const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")
    const locationFilters = ["مذکر", "مونث"]
    const SexOptions = useSelector(state => state.sex)

    const nav = useNavigate()

    const showFiltersAndApply = (params) => {
        applyFilter(SexOptions.find(a => a.name === params)?.value)
        setFilterParam(params)
    }

    const removeAppliedFilter = () => {
        removeFilter()
        setFilterParam("")
        setSearchText("")
    }

    const dispatch = useDispatch();

    const openAddOporatorModal = () => {
        dispatch(openModal({
            title: "اضافه کردن اپراتور جدید", size: 'lg',
            bodyType: MODAL_BODY_TYPES.OPORATOR_ADD
        }))
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

            <button className="btn  btn-info normal-case" onClick={() => openAddOporatorModal()} >اپراتور جدید</button>
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


function OporatorsList() {


    const fetchOporators = () => {

        const response = dispatch(fetchOporatorsApi())
        return response
    }

    const fetchOporationTypes = () => {

        const response = dispatch(fetchOporationTypeApi())
        return response
    }

    const dispatch = useDispatch()

    useEffect(() => {
        fetchOporators()
        fetchOporationTypes()
    }, [])


    const oporatorsList = useSelector(state => state.oporators.oporators)


    const [filteredOporators, setFilteredOporators] = useState()
    const [oporators, setOporators] = useState()

    useEffect(() => {
        setOporators(oporatorsList)
        setFilteredOporators(oporatorsList)

    }, [oporatorsList])

    const removeFilter = () => {
        setFilteredOporators(oporators)

    }

    const applyFilter = (params) => {
        console.log(params)
        let filteredTransactions = filteredOporators.filter((t) => { return t.gender == params })
        setFilteredOporators(filteredTransactions)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = filteredOporators.filter((t) => { return t.email.toLowerCase().includes(value.toLowerCase()) || t.userName.toLowerCase().includes(value.toLowerCase()) || t.mobile.toLowerCase().includes(value.toLowerCase()) })
        setFilteredOporators(filteredTransactions)
    }

    const oporationTypes = useSelector(state => state.oporationType.OporationType)
    const SexOptions = useSelector(state => state.sex)



    const deleteCurrentLead = (index, userName) => {
        dispatch(openModal({
            title: " کاربر حذف میشود!", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: {
                message: ` آیا از حذف  کاربر ${userName}  مطمئن هستید؟ `,
                type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index
            }
        }))
    }
    const openUserDetailModal = (userName) => {
        dispatch(openModal({
            title: "   ",
            extraObject: { userName: { userName } }
            , bodyType: MODAL_BODY_TYPES.USER_DETAIL
        }))
    }

    const openUserUpdateModal = (userName, mobile, email) => {
        dispatch(openModal({
            title: "ویرایش کاربر",
            bodyType: MODAL_BODY_TYPES.USER_UPDATE,
            extraObject: { userName: { userName }, mobile: { mobile }, email: { email } },
        }))
    }



    let content

    if (filteredOporators) {

        content = (
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>نام</th>
                        <th>تخصص</th>
                        <th>شماره ملی</th>
                        <th> جنسیت</th>
                        <th>تلفن همراه </th>
                        <th>توضیحات </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredOporators.map((l, k) => {
                            return (
                                <tr key={k}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12">
                                                    <img src={`https://avatars.dicebear.com/api/male/${l.firstName}.svg`} alt="Avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{l.firstName}{" "}{l.lastName}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>{oporationTypes.find(a => a.id === l.operationType)?.name}</td>
                                    <td>{l.nationalCode}</td>
                                    <td>{SexOptions.find(a => a.value === l.gender)?.name}</td>
                                    <td>{l.mobile}</td>
                                    <td>
                                        {l.description}
                                    </td>
                                    <td>
                                        <div className="btn-group">

                                            <button onClick={() => deleteCurrentLead(l.id, l.userName)} className="btn btn-xs btn-square btn-ghost">
                                                <TrashIcon className="w-5" /></button>
                                            <button onClick={() => openUserUpdateModal(l.userName, l.mobile, l.email)} className=" btn btn-xs btn-square btn-ghost">
                                                <PencilSquareIcon className="w-5" /></button>
                                            <button onClick={() => openUserDetailModal(l.userName)} className=" btn btn-xs btn-square btn-ghost">
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


export default OporatorsList