import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {
  createChurchValidator,
  findChurchValidtator,
  updateChurchValidator
} from 'App/Validators/Churches'

import Church from 'App/Models/Church'

export default class ChurchesController {
  public async index({ response }: HttpContextContract) {
    const churches = await Church.all()

    return response.status(200).json({ churches })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = request.body()

    await createChurchValidator.validate(payload)

    const church = await Church.create(payload)

    return response.status(200).json({ church })
  }

  public async find({ request, response }: HttpContextContract) {
    const payload = request.params()

    await findChurchValidtator.validate(payload)

    const church = await Church.findOrFail(payload.id)

    return response.status(200).json({ church })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = request.body()

    await updateChurchValidator.validate(payload)

    const { name } = payload

    const church = await Church.findOrFail(params.id)
    await church.merge({ name }).save()

    return response.status(200).json({ church })
  }
}
