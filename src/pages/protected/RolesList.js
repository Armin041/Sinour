import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import RolesList from '../../features/roles/components/RolesList'

function InternalPage() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "لیست نقش ها" }))
    }, [])

    return (
        <RolesList />
    )
}

export default InternalPage