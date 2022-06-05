/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Auth
Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/logout', 'AuthController.logout')
  Route.post('/register', 'AuthController.register')
})

// Users
Route.group(() => {
  Route.get('/users', 'UsersController.index')
  Route.get('/users/:id', 'UsersController.find')
  Route.put('/users/:id', 'UsersController.update')
}).middleware('auth')

// Churches
Route.group(() => {
  Route.get('/churches', 'ChurchesController.index')
  Route.post('/churches', 'ChurchesController.store')
  Route.get('/churches/:id', 'ChurchesController.find')
  Route.put('/churches/:id', 'ChurchesController.update')
}).middleware('auth')

// Schedules
Route.group(() => {
  Route.get('/schedules', 'SchedulesController.index')
  Route.post('/schedules', 'SchedulesController.store')
  Route.get('/schedules/:id', 'SchedulesController.find')
  Route.put('/schedules/:id', 'SchedulesController.update')
  Route.put('/schedules/:id/change_status', 'SchedulesController.changeStatus')
}).middleware('auth')
