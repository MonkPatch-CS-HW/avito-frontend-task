import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ru: {
    translation: {
      page: {
        form: { label: 'Создать', description: 'Создать или отредактировать объявление' },
        list: { label: 'Список', description: 'Список объявлений' },
      },
      model: {
        item: {
          name: { description: 'Название' },
          location: { description: 'Расположение' },
          description: { description: 'Описание' },
          type: { description: 'Тип объявления' },
          propertyType: { description: 'Тип имущества' },
          area: { description: 'Площадь' },
          rooms: { description: 'Количество комнат' },
          price: { description: 'Цена' },
          brand: { description: 'Производитель' },
          model: { description: 'Модель' },
          year: { description: 'Год выпуска' },
          mileage: { description: 'Пробег' },
          serviceType: { description: 'Тип услуги' },
          experience: { description: 'Опыт' },
          cost: { description: 'Стоимость' },
          workSchedule: { description: 'График работы' },
        },
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
