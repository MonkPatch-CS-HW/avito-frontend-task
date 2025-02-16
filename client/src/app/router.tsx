import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { navigationMap } from '@/shared/model'
import { FormPage } from '@/pages/form'
import { ListPage } from '@/pages/list'

export const Router = () => {
  const location = useLocation()

  return (
    <Routes location={location}>
      <Route index element={<Navigate to={navigationMap.list} />} />
      <Route path={navigationMap.list} element={<ListPage />} />
      <Route path={navigationMap.form} element={<FormPage />} />
      <Route path={navigationMap.itemById} element={<span>Item by id</span>} />
      <Route path="*" element={<span>404</span>} />
    </Routes>
  )
}
