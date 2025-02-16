import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { navigationMap } from '@/shared/model'
import { ItemMetaInput } from '@/entities/item'
import { ItemType } from '@/entities/item/model'

export const Router = () => {
  const location = useLocation()

  return (
    <Routes location={location}>
      <Route index element={<Navigate to={navigationMap.list} />} />
      <Route path={navigationMap.list} element={<ItemMetaInput itemType={ItemType.AUTO} meta={{}} />} />
      <Route path={navigationMap.form} element={<span>Form</span>} />
      <Route path={navigationMap.itemById} element={<span>Item by id</span>} />
      <Route path="*" element={<span>404</span>} />
    </Routes>
  )
}
