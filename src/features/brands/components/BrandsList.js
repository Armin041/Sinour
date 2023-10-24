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
import { fetchBrandsApi } from "../brandSlice"


const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")

    const dispatch = useDispatch();

    const openAddBrandModal = () => {
        dispatch(openModal({ title: "اضافه کردن برند جدید", bodyType: MODAL_BODY_TYPES.BRANDS_ADD_NEW }))
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
            <button className="btn  btn-info normal-case" onClick={() => openAddBrandModal()} >برند جدید </button>
            <div className="flex">
                <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
            </div>
        </div>

    )
}


function BransList() {


    const fetchBrandsList = () => {

        const response = dispatch(fetchBrandsApi())
        return response
    }

    const dispatch = useDispatch()

    useEffect(() => {
        fetchBrandsList()
    }, [])
    const BrandsList = useSelector(state => state.brands.Brands)


    const [filteredBrands, setFilteredBrands] = useState()
    const [brands, setBrands] = useState()

    useEffect(() => {
        setBrands(BrandsList)
        setFilteredBrands(BrandsList)

    }, [BrandsList])

    const removeFilter = () => {
        setFilteredBrands(brands)

    }

    const applyFilter = (params) => {
        console.log(params)
        let filteredTransactions = filteredBrands.filter((t) => { return t.gender == params })
        setFilteredBrands(filteredTransactions)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = filteredBrands.filter((t) => { return t.name.toLowerCase().includes(value.toLowerCase()) })
        setFilteredBrands(filteredTransactions)
    }


    const openDeleteModal = (index, name) => {
        dispatch(openModal({
            title: " برند حذف میشود!", bodyType: MODAL_BODY_TYPES.BRANDS_DELETE,
            extraObject: { message: ` آیا از حذف  برند ${name}  مطمئن هستید؟ `, type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index }
        }))
    }

    const openBrandUpdateModal = (id, name, code) => {
        dispatch(openModal({
            title: "ویرایش برند",
            bodyType: MODAL_BODY_TYPES.BRANDS_UPDATE,
            extraObject: { name: { name }, id: { id }, code: { code } },
        }))
    }

    const arr = []

    console.log(filteredBrands)

    // arr = "597ecca8-95d4-4ed9-8aff-09a5842eeea7" === usersList.userTypeId


    let content

    if (filteredBrands) {

        content = (
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>عنوان</th>
                        <th>کد </th>
                        <th>تعداد</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredBrands.map((l, k) => {


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
                                        {l.code}
                                    </td>
                                    {/* <td>{BrandsList.data.find(a => a.id === l.userTypeId)?.name}</td>
                                    <td>{l.mobile}</td>
                                    <td>{SexOptions.find(a => a.value === l.gender)?.name}</td>
                                    <td><div className="badge badge-success">فعال</div></td>
                                    <td>
                                        {l.email}
                                    </td> */}
                                    <td>
                                        <div className="badge badge-info">
                                            5
                                        </div>
                                    </td>
                                    <td>
                                        <div className="btn-group">

                                            <button onClick={() => openDeleteModal(l.id, l.name)} className="btn btn-xs btn-square btn-ghost">
                                                <TrashIcon className="w-5" /></button>
                                            <button onClick={() => openBrandUpdateModal(l.id, l.name, l.code)} className=" btn btn-xs btn-square btn-ghost">
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


export default BransList