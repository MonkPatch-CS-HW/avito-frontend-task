import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { navigationMap } from '@/shared/model'
import { FormPage } from '@/pages/form'

export const Router = () => {
  const location = useLocation()

  return (
    <Routes location={location}>
      <Route index element={<Navigate to={navigationMap.list} />} />
      <Route path={navigationMap.list} element={<div>List</div>} />
      <Route path={navigationMap.form} element={<FormPage />} />
      <Route path={navigationMap.itemById} element={<span>Item by id</span>} />
      <Route path="*" element={<span>404</span>} />
    </Routes>
  )
}
