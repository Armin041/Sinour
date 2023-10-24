import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'
import userSlice from '../features/users/userSlice'
import roleSlice from '../features/roles/roleSlice'
import sexSlice from '../features/sex/sex'
import OporationTypeSlice from '../features/OporationType/oprationTypeSlice'
import oporatorsSlice from '../features/oporators/oporatorsSlice'
import PasswordChangeSlice from '../features/user/passwordChangeSlice'
import brandSlice from '../features/brands/brandSlice'
import productNameSlice from '../features/Products/productsName/productsNameSlice'

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  users: userSlice,
  roles: roleSlice,
  sex: sexSlice,
  oporationType: OporationTypeSlice,
  oporators: oporatorsSlice,
  passChange: PasswordChangeSlice,
  brands: brandSlice,
  productsName: productNameSlice
}

export default configureStore({
  reducer: combinedReducer
})