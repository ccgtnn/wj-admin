import * as yup from 'yup'

export const mmFilesValidator = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  url: yup.string().required(),
  duration: yup.number().integer().default(0),
  size: yup.number().integer(),
  xid: yup.string().required(),
  xtype: yup.string().required(),
  dateCreate: yup.number().integer().default(0),
})

export const arrayMmFilesValidator = yup.array().of(mmFilesValidator)
