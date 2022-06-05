import Schedule from 'App/Models/Schedule'
import * as yup from 'yup'

export const createScheduleValidator = yup.object().shape({
  name: yup
    .string()
    .required('validation.schedule_name_required')
    .max(255, 'validation.max_length_exceeded'),
  date: yup.date().required('validation.date_required')
})

export const findScheduleValidator = yup.object().shape({
  id: yup.string().required('validation.schedule_id_required')
})

export const changeStatusScheduleValidator = yup.object().shape({
  status: yup
    .string()
    .required('validation.status_required')
    .oneOf(Schedule.allStatus, 'validation.invalid_status')
})
