import { Router } from 'express';
import { createAuthRoute } from './create-auth.route';

const router: Router = Router()
router.use("/api/users", createAuthRoute)
export { router as indexRouter };