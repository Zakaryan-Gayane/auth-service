import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import CreateAuthController from '../controller.ts/create-auth.controller';

const router: Router = Router();
router
    .post("/signup",
        [body("email").isEmail().withMessage("Email must be valid"),
        body("password")
            .trim()
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,25}$/, "i")
            .withMessage(
                "Password must be between 8 and 25 characters, and contain uppercase, lowercase, number and special character"
            ),
        ],
        validateRequest, CreateAuthController.signup)
export { router as createAuthRoute };