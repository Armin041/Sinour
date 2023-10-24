import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ProductsNameList from '../../features/Products/productsName/components/productsNameList'

function InternalPage() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "لیست نقش ها" }))
    }, [])

    return (
        <ProductsNameList />
    )
}

export default InternalPage