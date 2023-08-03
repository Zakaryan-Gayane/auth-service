import { Router } from 'express';
import { AuthRoute } from './auth.route';

const router: Router = Router()
router.use("/api/users", AuthRoute)
export { router as indexRouter };