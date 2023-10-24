import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import BrandsList from '../../features/brands/components/BrandsList'

function InternalPage() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "لیست برند ها" }))
    }, [])

    return (
        <BrandsList />
    )
}

export default InternalPage