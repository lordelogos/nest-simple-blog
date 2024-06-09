import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // Recall again that Passport will build a user object based on the return value of our validate() method, and attach it as a property on the Request object.
  async validate(payload: { userId: number }) {
    const user = this.userService.findOne(payload.userId);

    if (!user) throw new NotFoundException();

    return user;
  }
}
