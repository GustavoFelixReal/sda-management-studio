import Church from 'App/Models/Church'
import * as yup from 'yup'

export const createEventValidator = yup.object().shape({
  title: yup.string().required('validation.event_title_required'),
  description: yup.string().required('validation.event_description_required'),
  objective: yup.string().required('validation.event_objective_required'),
  voiceOverSuggestions: yup.string().max(300),
  contactDetails: yup.string().max(300),
  date: yup.date().required('validation.event_date_required'),
  location: yup.string().required('validation.event_location_required'),
  department: yup
    .string()
    .required('validation.event_department_required')
    .oneOf(Church.departments, 'validation.invalid_department'),
  images: yup.array().of(
    yup.object().shape({
      src: yup.string().required('validation.event_image_src_required'),
      description: yup.string().max(50)
    })
  ),
  links: yup.array().of(
    yup.object().shape({
      url: yup.string().required('validation.event_link_url_required'),
      description: yup.string().max(50)
    })
  )
})

export const cycleListValidator = yup.object().shape({
  cycle: yup.string().required('validation.event_cycle_required')
})

export const findEventValidator = yup.object().shape({
  id: yup.string().required('validation.event_id_required')
})
