import * as yup from 'yup'

export const issuesTranslationValidator = yup.object({
  id: yup.number().integer().required(),
  issueId: yup.number().integer().required(),
  name: yup.string().required(),
  lang: yup.string().required(),
})

export const arrayIssuesTranslationValidator = yup
  .array()
  .of(issuesTranslationValidator)
