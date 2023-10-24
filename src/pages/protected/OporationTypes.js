import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import OporationTypeList from '../../features/OporationType/components/oporationTypeList'

function InternalPage() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "لیست نقش ها" }))
    }, [])

    return (
        <OporationTypeList />
    )
}

export default InternalPage