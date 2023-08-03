import { Request, Response } from "express";
import { BaseEntity, getConnection, getManager } from "typeorm";
import { User } from "../db/user.entity";

class GetAuthController extends BaseEntity {
    static activateUser = async (req: Request, res: Response) => {
        const {
       
            email,
         
          } = req.body;
        try {
            const userRepo = getManager().getRepository(User);

                const existingUser: User = await userRepo.findOne(email );

            if (!existingUser) return res.status(401).send("invalid activation token");

            await getConnection()
                .createQueryBuilder()
                .select()
                .from(User, 'user')
                .where({ email: existingUser.email })
                .orderBy('al.id', 'DESC')              
                .getRawMany()


            res.status(200).send({});
        } catch (e) {
            console.error("meErr", e);
            throw new Error("Something got wrong");
        }
    }
}

export default GetAuthController;
