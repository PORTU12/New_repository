import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/Auth/JwtAuth.guards';
import { User } from 'src/decorators/user.decorateurs';
import { ProduitService } from './produits.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { ProduitDto } from './dto/create-produit.dto';
import { ProduitEntity } from './entities/produit.entity';

@ApiTags('Produits')

@Controller('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProduitDto: ProduitDto, @User() request: UserEntity) {
    const response = await this.produitsService.createProduit(createProduitDto, request?.username)
    const user = response
    console.log(user)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @User() request: ProduitEntity
  ) {
    const findAllProduit = await this.produitsService.findAllProduct(request?.user)
    return findAllProduit;
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number, @User() request: UserEntity): Promise<void> {
    return this.produitsService.findOneProduct(id, request?.produit);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  Modifier(@Param('id') id: number, @Body() updateProduitDto: UpdateProduitDto, user) {
    return this.produitsService.ModifProduit(id, updateProduitDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  Supprimer(@Param('id', ParseIntPipe) id: number, user) {
    return this.produitsService.SupprProduit(id, user);

  }
}
