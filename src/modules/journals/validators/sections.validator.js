import * as yup from 'yup'

export const sectionsValidator = yup.object({
  id: yup.number().integer().required(),
  issueId: yup.number().integer().required(),
  name: yup.string().required(),
  ord: yup.number().integer().default(0),
  dateCreate: yup.number().integer().default(0),
})

export const arraySectionsValidator = yup.array().of(sectionsValidator)
