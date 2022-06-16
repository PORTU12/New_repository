import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from './entities/user.entity';

@Injectable()
/*We add five methods in our service,*/
export class UserService {
  constructor(@InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>) { }

  async getById(id: number) {
    const user = await this.userRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(`Cet utilisateur n'existe pas`, HttpStatus.NOT_FOUND);
  }
  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async update(id: number, updateBookDto: UpdateUserDto): Promise<UserEntity> {
    const updateUser = this.getById(id)
    return updateUser;
  }

  async delete(id: number){
    const deleteUser = this.getById(id)
    return deleteUser;
  }
//restaurer l'utilisateur supprimé
  async restoreuser(id: number) {
    this.userRepository.restore(id)
  }
  async softdelete(id: number) {
    const userremove = await this.getById(id);
    return this.userRepository.softDelete(id)
  }

  async statusernumberbyemail(){
    const qb = this.userRepository.createQueryBuilder("user").leftJoinAndSelect("user.produit", "produit")
    //chercher le nombre d'user par email
    .where("user.username = username", { name: "User1" })
      .getOne()// recuperer les entités complètes getOne(une seule entité)
  }
}