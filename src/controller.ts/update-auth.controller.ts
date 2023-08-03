import { Request, Response } from "express";
import { BaseEntity, getConnection, getManager } from "typeorm";
import { User } from "../db/user.entity";
import jwt from "jsonwebtoken";
import { Password } from "../services/password";
import { BadRequestError } from "../errors/bad-request-error";

class UpdateAuthController extends BaseEntity {
    static userManager = async (req: Request, res: Response) => {
        try {
            const { email, password, name, surname, phone } = req.body;

            const userRepo = getManager().getRepository(User);

            const existingUser: User = await userRepo.findOne({
               email:req.currentUser.email
            });
            console.log("existingUser", existingUser);

            const passwordsMatch = await Password.compare(
                existingUser.password,
                password
            );
            if (!passwordsMatch) {
                throw new BadRequestError("Current password doesn't match");
            }
            const setParams: any = {};
            !!email && (setParams.email = email);
            !!name && (setParams.name = name);
            !!surname && (setParams.surname = surname);
            !!phone && (setParams.phone = phone);

            const token = jwt.sign(
                {
                    id: existingUser.id,
                    email: email || existingUser.email,
                },
                process.env.JWT_KEY!
            );

            console.log('setParams', setParams)


            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set(setParams)
                .where("id = :id", { id: existingUser.id })
                .execute();

            res.status(200).send({ token });
        } catch (e) {
            console.error("updateUserErr", e);
            throw new Error("Something went wrong");
        }
    }

    static password = async (req: Request, res: Response) => {
        try {
            const { currentPassword, newPassword, recoveryToken } = req.body;

            const userRepo = getManager().getRepository(User);

            const existingUser: User = await userRepo.findOne({
                email: req.currentUser.email
            });
            console.log("existingUser", existingUser);

            const passwordsMatch = await Password.compare(
                existingUser.password,
                currentPassword
            );

            if (recoveryToken !== existingUser.recoveryToken)
                throw new BadRequestError("Invalid recoveryToken");

            if (!passwordsMatch)
                throw new BadRequestError("Current password doesn't match");



            const hashedPassword: string = await Password.toHash(newPassword);

            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({ password: hashedPassword })
                .where("id = :id", { id: existingUser.id })
                .execute();

            res.status(200).send("OK");
        } catch (e) {
            console.error("chPassErr", e);
            throw new Error("Something went wrong");
        }
    }
}
export default UpdateAuthController;
