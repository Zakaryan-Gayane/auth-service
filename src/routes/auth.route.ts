import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import CreateAuthController from '../controller.ts/create-auth.controller';
import GetAuthController from '../controller.ts/get-auth.controller';
import { currentUser } from '../middlewares/current-user';
import UpdateAuthController from '../controller.ts/update-auth.controller';
import DeleteAuthController from '../controller.ts/delete-auth.controller';

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

        .post("/signin",
        [
            body("email").isEmail().withMessage("Email must be valid"),
            body("password")
                .trim()
                .notEmpty()
                .withMessage("You must supply a password"),
        ],
        validateRequest, CreateAuthController.signin)


    .post("/signout",
        currentUser, CreateAuthController.signout)

        .get("/activate/:activationToken", GetAuthController.activateUser)


        .put("/",
        [
            body("email").isEmail().withMessage("Email must be valid"),
            body("password").trim().notEmpty()
                .withMessage("You must supply a password"),
        ],
        validateRequest,
        currentUser, UpdateAuthController.userManager)
        
        .patch("/password",
        [
            body("recoveryToken").trim().notEmpty().withMessage("recoveryToken must be provided"),
            body("newPassword").trim()
                .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,25}$/, "i")
                .withMessage(
                    "Password must be between 8 and 25 characters, and contain uppercase, lowercase, number and special character"
                ),
        ],
        validateRequest, currentUser,UpdateAuthController.password)

        .delete("/delete/:id",
        validateRequest, currentUser,DeleteAuthController.removeUser)
export { router as AuthRoute };