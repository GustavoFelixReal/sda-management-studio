import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {
  changeStatusScheduleValidator,
  createScheduleValidator,
  findScheduleValidator
} from 'App/Validators/Schedules'

import PermissionDeniedException from 'App/Exceptions/PermissionDeniedException'
import Schedule from 'App/Models/Schedule'

export default class SchedulesController {
  public async index({ auth, response }: HttpContextContract) {
    const schedules = await Schedule.query()
      .where('churchId', auth.user.$attributes.churchId)
      .preload('author')
      .preload('maintainer')

    return response.status(200).json({ schedules })
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const payload = request.body()

    await createScheduleValidator.validate(payload)

    const { id, churchId } = auth.user.$attributes

    const schedule = await Schedule.create({
      churchId: churchId,
      name: payload.name,
      date: payload.date,
      createdBy: id,
      updatedBy: id
    })

    schedule.status = 'PENDING'

    return response.status(200).json({ schedule })
  }

  public async find({ auth, request, response }: HttpContextContract) {
    const payload = request.params()

    await findScheduleValidator.validate(payload)

    const schedule = await Schedule.query()
      .where('id', payload.id)
      .where('churchId', auth.user.$attributes.churchId)
      .preload('author')
      .preload('maintainer')
      .first()

    if (!schedule) {
      throw new PermissionDeniedException('', 401, 'E_PERMISSION_DENIED')
    }

    return response.status(200).json({ schedule })
  }

  public async changeStatus({
    auth,
    request,
    response,
    params
  }: HttpContextContract) {
    const payload = request.body()

    await changeStatusScheduleValidator.validate(payload)

    const { status } = payload

    const schedule = await Schedule.findOrFail(params.id)

    if (schedule.$attributes.churchId !== auth.user.$attributes.churchId) {
      throw new PermissionDeniedException('', 401, 'E_PERMISSION_DENIED')
    }

    await schedule.merge({ status }).save()

    return response.status(200).json({ schedule })
  }
}
