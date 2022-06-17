import Env from '@ioc:Adonis/Core/Env'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { createEventValidator, cycleListValidator } from 'App/Validators/Events'

import Event from 'App/Models/Event'
import EventImage from 'App/Models/EventImage'
import EventLink from 'App/Models/EventLink'

export default class EventsController {
  public async index({ auth, response }: HttpContextContract) {
    const events = await Event.query()
      .preload('images', (query) => {
        query.select('id', 'src', 'description')
      })
      .preload('relatedLinks', (query) => {
        query.select('id', 'url', 'description')
      })
      .where('churchId', auth.user.$attributes.churchId)

    return response.status(200).json({ events })
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const payload = request.body()

    await createEventValidator.validate(payload)

    const { id, churchId } = auth.user.$attributes

    const event = await Event.create({
      churchId: payload.isInternal ? churchId : null,
      title: payload.title,
      description: payload.description,
      objective: payload.objective,
      voiceOverSuggestions: payload.voiceOverSuggestions,
      contactDetails: payload.contactDetails,
      date: payload.date,
      location: payload.location,
      isInternal: payload.isInternal,
      department: payload.department,
      status: 'PENDING',
      cycle: (() => {
        const currentDate = new Date()
        const currentWeekDay = currentDate.getDay() + 1

        if (currentWeekDay > Number(Env.get('EVENT_MAX_SUBMISSION_WEEK_DAY'))) {
          return this.getCycle(currentDate, 1).cycle
        }

        return this.getCycle(currentDate).cycle
      })(),
      createdBy: id,
      updatedBy: id
    })

    await EventImage.createMany(
      payload.images.map((image) => ({
        ...image,
        eventId: event.id
      }))
    )

    await EventLink.createMany(
      payload.links.map((link) => ({
        ...link,
        eventId: event.id
      }))
    )

    return response.status(200).json({ event })
  }

  public async cycleList({ auth, request, response }: HttpContextContract) {
    const payload = request.params()

    await cycleListValidator.validate(payload)

    const events = await Event.query()
      .select('id', 'title', 'date', 'status', 'cycle', 'updatedBy')
      .whereRaw('(church_id = ? OR is_internal = ?)', [
        auth.user.$attributes.churchId,
        false
      ])
      .andWhereNotIn('status', ['CANCELED', 'REJECTED', 'COMPLETED'])
      .andWhere('cycle', payload.cycle)
      .preload('maintainer', (query) => {
        query.select('id', 'name')
      })

    return response.status(200).json({ events })
  }

  private getCycle(
    date: Date,
    incrementWeek = 0
  ): { cycle: string; currentWeek: number } {
    const startDate = new Date(date.getFullYear(), 0, 1)

    const pastDays = Math.floor(
      (date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
    )

    const currentWeek = Math.ceil(pastDays / 7)

    const cycle = `${('0' + (currentWeek + incrementWeek)).slice(
      -2
    )}${date.getFullYear()}`

    return { cycle, currentWeek }
  }
}
