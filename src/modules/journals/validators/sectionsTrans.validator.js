import * as yup from 'yup'

export const sectionsTransValidator = yup.object({
  id: yup.number().integer().required(),
  sectionId: yup.number().integer().required(),
  name: yup.string().required(),
  lang: yup.string().required(),
})

export const arraySectionsTransValidator = yup
  .array()
  .of(sectionsTransValidator)
