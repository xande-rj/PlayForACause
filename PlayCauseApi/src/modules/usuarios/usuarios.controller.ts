import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UserDto } from './dtos/Usuario.dto';


@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() data: UserDto ) {
    return this.usuariosService.create(data);
  }
  
  @Get(':email')
  findOneEmail(@Param('email') email: string ) {
    return this.usuariosService.findOneEmail(email);
  }
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':email/:senha')
  findOneEmailPasswword(@Param('email') email: string ,@Param('senha') senha: string) {
    return this.usuariosService.findOneEmailPasswword(email,senha);
  }

  @Get(':ids')
  findOne(@Param('ids') ids: string) {
    return this.usuariosService.findOne(ids);
  }

  @Put(':ids')
  update(@Param('ids') ids: string, @Body() data: UserDto ) {
    return this.usuariosService.update(ids,data);
  }

  @Delete(':ids')
  remove(@Param('ids') ids: string) {
    return this.usuariosService.remove(ids);
  }
}
