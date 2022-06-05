import * as yup from 'yup'

export const createChurchValidator = yup.object().shape({
  name: yup.string().required('validation.church_name_required')
})

export const findChurchValidtator = yup.object().shape({
  id: yup.string().required('validation.church_id_required')
})

export const updateChurchValidator = yup.object().shape({
  name: yup.string().required('validation.church_name_required')
})
