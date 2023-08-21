import * as yup from 'yup'

export const issuesValidator = yup.object({
  id: yup.number().integer().required(),
  name: yup.string().required(),
  year: yup.string().default(''),
  ord: yup.number().integer().default(0),
  dateCreate: yup.number().integer().default(0),
})

export const arrayIssuesValidator = yup.array().of(issuesValidator)
