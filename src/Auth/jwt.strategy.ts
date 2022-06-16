import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { payloadInterface } from './payload.interface';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private AuthRepository: Repository<UserEntity>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //jwt de la requete en utilisant la methode ExtractJwt.fromAuthHeaderAsBearerToken
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: payloadInterface) {//payload de type payloadInterface
    console.log(payload)
    //je recupère le nom d'user
    const user = await this.AuthRepository.findOne({username: payload.username});
    console.log(user)
//si le user existe je le retourne dans validate
    if (user){
      const {password, ...result} = user;
      return result;
    }else{
      throw new UnauthorizedException();
    }
  }
}