import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

import jwt from "jsonwebtoken";
import { User } from '../db/user.entity';

export class Token {
  static uniqueToken(): string {
    return `${uuidv4()}-${randomBytes(8).toString('hex')}`;
  }
  static generateToken(user: User): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        activationToken: user.activationToken,
        isActivated: user.active,
        agreementAccepted: user.agreementAccepted,
        isPasswordTemporary: user.isPasswordTemporary
      },
      process.env.JWT_KEY!
    );
  }
}