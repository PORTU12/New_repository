import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { ProduitDto } from '../dto/create-produit.dto'
import { UpdateProduitDto } from '../dto/update-produit.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../Auth/JwtAuth.guards';
import { UserEntity } from '../entities/user.entity';
import { User } from '../decorators/user.decorateurs';
import { ProduitEntity } from 'src/entities/produit.entity';

@ApiTags('Produits')

@Controller('produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @Post()
  async create(@Body() createProduitDto: ProduitDto, @User() request: UserEntity){
    const response = await this.produitService.createProduit(createProduitDto, request?.username)
    const user = response
    console.log(user)
  }

  @Get()
  async findAll(
    @User() request: UserEntity
  ) {
    const findAllProduit = await this.produitService.findAllProduct(request?.user)
    return findAllProduit;
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: `Obtenir le produit crée avec un token` })
  @ApiBearerAuth()
  findOne(@Param('id') id: string, @User() request: UserEntity):Promise<ProduitEntity>  {
    return this.produitService.findOneProduct(id, request?.user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: `Modifier le produit crée avec un token` })
  @ApiBearerAuth()
  Modifier(@Param('id') id: string, @Body() updateProduitDto: UpdateProduitDto, user): Promise<UpdateProduitDto> {
    return this.produitService.ModifProduit(id, updateProduitDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: `Supprimer le produit crée avec un token` })
  @ApiBearerAuth()
  Supprimer(@Param('id', ParseIntPipe) id: string, user): Promise<ProduitDto>{
    return this.produitService.SupprProduit(id, user);
  }
}
