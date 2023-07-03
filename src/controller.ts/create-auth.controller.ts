import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Token } from "../services/token";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import { BaseEntity, DataSource } from "typeorm";
import { User } from "../db/user.entity";

class CreateAuthController extends BaseEntity {
static signup = async (req: Request, res: Response) => {
    const {
      phone,
      email,
      password,
    } = req.body;

    try {
      
      const userRepo = new DataSource().getRepository(User);    
      const existingUser = await userRepo.findOne(  email );
      if (existingUser) throw new BadRequestError("User Email in use");


      const hashedPassword: string = await Password.toHash(password);
      const newUser = userRepo.create({
        email,
        password: hashedPassword,
        activationToken: Token.uniqueToken(),
      });
      const user: User = await userRepo.save(newUser);

      console.log("user has created", user);
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          activationToken: user.activationToken,
          isActivated: user.active,
        },
        process.env.JWT_KEY!
      );
      res.status(201).send({});
    } catch (e) {
      console.error(e);
      throw new BadRequestError(e.message);
    }
  }
}
export default CreateAuthController;