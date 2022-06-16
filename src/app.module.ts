import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import {AuthModule} from './Auth/auth.module'
import { UserModule } from './user/user.module';
import { ProduitModule } from './produits/produits.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POST_HOST,
    port: +process.env.POST_PORT,
    username: process.env.POST_USER,
    password: process.env.POST_PASSWORD,
    database: process.env.POST_DATABASE,
    //entities: ["dist/**/*.entity{.ts,.js}"], dossier dist fichier entities.ts/.js
    autoLoadEntities: true,
    synchronize: true, //synchronize nos entitités avec notre BD
  }), AuthModule, UserModule, ProduitModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
