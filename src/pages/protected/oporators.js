import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import UsersList from '../UsersList'
import OporatorsList from '../../features/oporators/components/OporatorsList'

function InternalPage() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "لیست اپراتور ها" }))
    }, [])

    return (
        <OporatorsList />
    )
}

export default InternalPage