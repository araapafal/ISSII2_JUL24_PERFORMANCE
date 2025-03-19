// This is a new file for solution!
import { hasRole, isLoggedIn } from '../middlewares/AuthMiddleware.js'
import * as PerformanceMiddleware from '../middlewares/PerformanceMiddleware.js'
import { handleValidation } from '../middlewares/ValidationHandlingMiddleware.js'
import * as PerformanceValidation from '../controllers/validation/PerformanceValidation.js'
import * as PerformanceControllers from '../controllers/PerformanceController.js'

const loadFileRoutes = (app) => {
  // TO-DO
  // Introduce the needed routing
  app.loadFileRoutes('/performances')
    .post(
      isLoggedIn,
      hasRole('owner'),
      handleValidation,
      PerformanceMiddleware.checkPerformanceRestaurantOwnership,
      PerformanceValidation.create,
      PerformanceControllers.create
    )
}

export default loadFileRoutes
