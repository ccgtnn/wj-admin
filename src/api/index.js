// Импорт модуля запросов и yup для валидации
import request from './request'

/**
 * Функция для валидации данных с сервера.
 *
 * @param {Object} response - ответ от сервера.
 * @param {yup.ObjectSchema} validator - схема для валидации данных.
 * @return {Object} возвращает данные в случае успешной валидации.
 * @throws {Error} в случае отсутствия данных или если данные не прошли валидацию.
 */
async function validateResponse(response, validator) {
  if (!response.data) throw new Error('API_NOT_LOAD')

  try {
    await validator.validate(response.data)
    return response.data
  } catch (error) {
    throw new Error(`API_NOT_VALID: ${error}`)
  }
}

/**
 * Функция для входа в систему.
 *
 * @param {Object} model - данные пользователя {login, pasw}.
 * @return {Object} возвращает {token, user:{id, name}, timeLimit}
 */
export async function signIn(model) {
  const { data } = await request.post('admin/auth/signIn', model)
  return data
}

/**
 * Функция для работы с API.
 *
 * @param {string} API_URL - базовый URL API.
 * @param {yup.ObjectSchema} validator - схема для валидации данных.
 * @param {yup.ArraySchema} arrayValidator - схема для валидации массива данных.
 * @return {Object} возвращает объект с методами для работы с API.
 */
export function Api({ API_URL, validator, arrayValidator }) {
  // Загрузка данных
  async function load() {
    const response = await request.get(API_URL)
    return await validateResponse(response, arrayValidator)
  }

  // Создание нового объекта данных
  async function create(model) {
    const response = await request.post(API_URL, model)
    return await validateResponse(response, validator)
  }

  // Обновление существующего объекта данных
  async function update(model) {
    const response = await request.put(`${API_URL}/${model.id}`, model)
    return await validateResponse(response, validator)
  }

  // Удаление объекта данных
  async function remove(id) {
    await request.delete(`${API_URL}/${id}`)
  }

  // Загрузка файла
  async function upload(type, file) {
    return await request.post(`app/files/${type}`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  return { load, create, update, remove, upload }
}
