import { HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginCredentialsDto } from "../dto/LoginCredentialsDto";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from '../entities/user.entity';
import { UserSubscribeDto } from "src/dto/UserSubscribe.dto";
import * as bcrypt from 'bcrypt'
import { UserDto } from "src/dto/create-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";

@Injectable()
/*We add five methods in our service,*/
export class UserService {
  constructor(@InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>) {}
  
  async getById(id: number) {
    const user = await this.userRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(`Cet utilisateur n'existe pas`, HttpStatus.NOT_FOUND);
  }
  async findAll(): Promise<UserEntity[]>{
    return this.userRepository.find();
  }

  update(id: number, updateBookDto: UpdateUserDto): Promise<UserDto>{
    const updateUser = this.getById(id)
    return updateUser;
  }

  delete(id: number) : Promise<UserDto> {
    const deleteUser = this.getById(id)
    return deleteUser;
  }
}