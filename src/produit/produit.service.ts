import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserRoleEnum } from 'src/enum/user.enum';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProduitDto } from '../dto/create-produit.dto';
import { UpdateProduitDto } from '../dto/update-produit.dto';
import { ProduitEntity } from '../entities/produit.entity';

@Injectable()
export class ProduitService {
  constructor(@InjectRepository(ProduitEntity)
  private ProdRepository: Repository<ProduitEntity>) { }

  createProduit(createProduitDto: ProduitDto, produit) {
    const newProduit = this.ProdRepository.create(createProduitDto);
    newProduit.user = produit
    return this.ProdRepository.save(newProduit);
  }

  async findAllProduct(user): Promise<ProduitEntity[]> {
    if (user.role === UserRoleEnum.ADMIN)
      return await this.ProdRepository.find()
    return this.ProdRepository.find({ user });
  }

  async findOneProduct(id: string, user) {
    const product = await this.ProdRepository.findOne({ id });
   
    if (!product) {
      throw new HttpException(`Ce produit n'existe pas`, HttpStatus.NOT_FOUND);
    }
    if (user.role === UserRoleEnum.ADMIN || product.user.id === user.id)
    return product;
    else
      throw new UnauthorizedException()
  }

  async ModifProduit(id: string, updateProduitDto: UpdateProduitDto, user): Promise<UpdateProduitDto> {
    const updateproduct = await this.findOneProduct(id, user)
    return updateproduct;
  }

  async SupprProduit(id: string, user): Promise<ProduitDto> {
    const deleteProduct = await this.findOneProduct(id, user);
    
    return deleteProduct;
  }
}