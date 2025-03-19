// This is a new file for solution!
import { check } from 'express-validator'
import { Restaurant } from '../../models/models.js'

const checkRestaurantExists = async (value, { req }) => {
  try {
    const restaurant = await Restaurant.findByPk(req.body.restaurantId)
    if (restaurant === null) {
      return Promise.reject(new Error('The restaurantId does not exist.'))
    } else { return Promise.resolve() }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

const checkPerformancesSameDate = async (value, { req }) => {
  try {
    let error = false
    // encuentra todas las performances de un restaurante en concreto
    const performances = await Performance.findAll({ where: { restaurantId: req.body.restaurantId } })
    for (const performance of performances) { // recorro las performances que he encontrado
      const newPerformanceDate = new Date(req.body.appointment)
      const performanceDateToCompare = performance.appointment
      if (newPerformanceDate.getTime() === performanceDateToCompare.getTime()) {
        error = true
        break
      }
    } if (error) {
      return Promise.reject(new Error('No pueden haber dos actuaciones en el mismo día.'))
    } else {
      return Promise.resolve()
    }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

const create = [
//  TO-DO: here's the validation for a new performance
  check('restaurantId').exists().isInt({ min: 1 }).toInt(),
  check('group').exists().isString().isLength({ min: 1, max: 255 }).trim(),
  check('appointment').exists().toDate(),
  check('restaurantId').custom(checkRestaurantExists),
  check('restaurantId').custom(checkPerformancesSameDate) // no puede haber dos actuaciones en un mismo día
]

export { create }
