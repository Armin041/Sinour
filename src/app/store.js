import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'
import leadsSlice from '../features/leads/leadSlice'
import roleSlice from '../features/roles/roleSlice'
import sexSlice from '../features/sex/sex'

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice,
  roles: roleSlice,
  sex: sexSlice
}

export default configureStore({
  reducer: combinedReducer
})