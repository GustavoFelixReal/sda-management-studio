/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

import { ValidationError } from 'yup'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    if (error instanceof ValidationError) {
      return ctx.response.status(406).send({
        errors: [
          {
            code: 'not_acceptable',
            status: 406,
            message: {
              [`${error.path}`]: error.message
            }
          }
        ]
      })
    }

    if (error.code === 'E_UNAUTHORIZED_ACCESS') {
      return ctx.response.status(401).json({
        errors: [
          {
            code: 'unauthenticated',
            status: 401,
            message: 'request.unauthenticated'
          }
        ]
      })
    }

    if (error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response.status(404).json({
        errors: [
          {
            code: 'not_found',
            status: 404,
            message: 'request.record_not_found'
          }
        ]
      })
    }

    if (error.code === 'E_PERMISSION_DENIED') {
      return ctx.response.status(401).json({
        errors: [
          {
            code: 'permission_denied',
            status: 401,
            message: 'request.permission_denied'
          }
        ]
      })
    }

    return super.handle(error, ctx)
  }
}
