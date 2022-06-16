import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { ProduitEntity } from './entities/produit.entity';
import { ProduitsController } from './produits.controller';
import { ProduitService } from './produits.service';

@Module({
  imports:[TypeOrmModule.forFeature([ProduitEntity, UserEntity])],
  controllers: [ProduitsController],
  providers: [ProduitService]
})
export class ProduitModule {}
