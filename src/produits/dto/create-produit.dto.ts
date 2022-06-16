import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProduitDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    prodname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price:number
}
