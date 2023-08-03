import { Request, Response } from "express";
import { BaseEntity, getConnection, getManager } from "typeorm";
import { User } from "../db/user.entity";
import jwt from "jsonwebtoken";
import { Password } from "../services/password";
import { BadRequestError } from "../errors/bad-request-error";


class DeleteAuthController extends BaseEntity {
    static removeUser = async (req: Request, res: Response) => {
    try {
        const {id } = req.body;

  
        const userRepo = getManager().getRepository(User);
        const user: User = await userRepo.findOne(id);
        if (Number(req.currentUser.id) !== Number(user.email))
          throw new BadRequestError("Access denied");
  
        await getConnection()
          .createQueryBuilder()
          .update(User)
          .set({ active: 0 })
          .where("id = :id", { id })
          .execute();
  
        res.status(200).send({});
      } catch (e) {
        console.error("updateUserErr", e);
            throw new Error("Something went wrong");
      }
    }
}
export default DeleteAuthController;