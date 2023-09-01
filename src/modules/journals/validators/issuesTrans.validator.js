import * as yup from 'yup'

export const issuesTransValidator = yup.object({
  id: yup.number().integer().required(),
  issueId: yup.number().integer().required(),
  name: yup.string().required(),
  lang: yup.string().required(),
})

export const arrayIssuesTransValidator = yup.array().of(issuesTransValidator)
