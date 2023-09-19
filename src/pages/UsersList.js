import moment from "moment"
import { useEffect, useState } from "react"
import TitleCard from "../components/Cards/TitleCard"
import { RECENT_TRANSACTIONS } from "../utils/dummyData"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../components/Input/SearchBar"
import { fetchUsers } from "../services/Authentication/usersService"
import userNotFound from '../assets/userNotFound.jpg'
import { useSelector } from "react-redux"

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")
    const locationFilters = ["مذکر", "مونث"]
    const SexOptions = useSelector(state => state.sex)

    const showFiltersAndApply = (params) => {
        applyFilter(SexOptions.find(a => a.name === params)?.value)
        setFilterParam(params)
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
            {filterParam != "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2" /></button>}

            <button className="btn  btn-info normal-case" >کاربر جدید</button>
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


    const [filteredUsers, setFilteredUsers] = useState()
    const [users, setUsers] = useState()



    const fetch = async () => {
        const { data } = await fetchUsers()
        setFilteredUsers(data.data)
        setUsers(data.data)
        return data
    }


    useEffect(() => {
        fetch()

    }, [])

    const removeFilter = () => {
        setFilteredUsers(users)
        console.log(users)
    }

    const applyFilter = (params) => {
        console.log(params)
        let filteredTransactions = filteredUsers.filter((t) => { return t.gender == params })
        setFilteredUsers(filteredTransactions)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = filteredUsers.filter((t) => { return t.email.toLowerCase().includes(value.toLowerCase()) || t.email.toLowerCase().includes(value.toLowerCase()) })
        setFilteredUsers(filteredTransactions)
    }
    const RoleOptions = useSelector(state => state.roles)
    const SexOptions = useSelector(state => state.sex)


    let content

    if (filteredUsers) {

        content = (
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>نام</th>
                        <th>ایمیل </th>
                        <th>نقش</th>
                        <th>موبایل</th>
                        <th>جنسیت </th>
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
                                                <div className="font-bold">{l.userName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{l.email}</td>
                                    <td>{RoleOptions.find(a => a.value === l.userTypeId)?.name}</td>
                                    <td>{l.mobile}</td>
                                    <td>{SexOptions.find(a => a.value === l.gender)?.name}</td>
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