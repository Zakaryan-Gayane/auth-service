import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Token } from "../services/token";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import { BaseEntity, getManager } from "typeorm";
import { User } from "../db/user.entity";
import { dbConnect } from "../db/connect";
import { Publisher } from "../brokers/kafka/publishers/main.publisher";
import { kafka } from "../brokers/kafka";
import { Topics } from "../constants/topics.enum";
import { RequestValidationError } from "../errors/request-validation-error";
import { AlarmText } from "../constants/alarm.enam";
class CreateAuthController extends BaseEntity {
static signup = async (req: Request, res: Response) => {
    const {
      phone,
      email,
      password,
    } = req.body;

    try {
    
      const userRepo = getManager().getRepository(User);
      const existingUser = await userRepo.findOne(email);
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
          phone: user.phone,
          activationToken: user.activationToken,
          isActivated: user.active,
        },
        process.env.JWT_KEY!
      );
      const publisher = new Publisher(kafka.client);

  

      publisher.publish(Topics.UserCreated, JSON.stringify({ email: email.id }));
      res.status(201).send({});
    } catch (e) {
      console.error(e);
      throw new BadRequestError(e.message);
    }
  }

  static signin = async (req: Request, res: Response) => {
    try {
    
      const { email, password } = req.body;
     
      const userRepo = getManager().getRepository(User);

      const existingUser: User = await userRepo.findOne( email );
      console.log("existingUser", existingUser);
      if (!existingUser) {
        throw new RequestValidationError([{ path:"" ,location: 'body', type:'field',value:'', msg: 'Email Address and Password does not match' }]);
      }

      const passwordsMatch = await Password.compare(
        existingUser.password,
        password
      );

      

      const token = Token.generateToken(existingUser);
     

      const publisher = new Publisher(kafka.client);

      publisher.publish(Topics.EventCreated, JSON.stringify({
      
        data: `${AlarmText.userSign}: ${existingUser.email}`
      }));

      res.status(200).send({ token });
    } catch (e) {
      console.error("signin", e);
      throw new Error("Something went wrong");
    }
  }


  static signout = async (req: Request, res: Response) => {
  
   
    try {
      const userRepo = getManager().getRepository(User)
      const user:User = await userRepo.findOne({email:req.currentUser.email});
     
      

      const publisher = new Publisher(kafka.client);

      publisher.publish(Topics.EventCreated, JSON.stringify({
  
        data: `${AlarmText.userSignout}: ${user.email}`

      }));

      res.status(200).send("OK");
    } catch (e) {
      console.error("logout", e);
      throw new Error("Something went wrong");
    }
  }


}
export default CreateAuthController;