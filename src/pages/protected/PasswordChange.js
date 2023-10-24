import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import PasswordChange from '../../features/user/PasswordChange'

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "تغییر رمز عبور" }))
    }, [])


    return (
        <PasswordChange />
    )
}

export default InternalPage