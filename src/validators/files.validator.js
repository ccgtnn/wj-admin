import * as yup from 'yup'

export const filesValidator = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  type: yup.string().required(),
  url: yup.string().required(),
  size: yup.number().integer(),
  dateCreate: yup.number().integer().default(0),
})

export const arrayFilesValidator = yup.array().of(filesValidator)
