import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos/Usuario.dto';
import { PrismaService } from './databases/PrismaService';

function conversorNumber(id: string) {
  return parseInt(id as string, 10);
};
function ifExist(userExist) {
  if (!userExist) {
    throw new Error('Usuario nao encontrado');
  }
};

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserDto) {
    const userExist = await this.prisma.usuario.findFirst({
      where: {
        email: data.email,
      },
    });
    if (userExist) {
      throw new Error('Usuario ja cadastrado');
    }
    const User = await this.prisma.usuario.create({
      data,
    });
    return User;
  }

  async findAll() {
    return this.prisma.usuario.findMany();
  }

  async findOne(ids: string) {
    let id: number = conversorNumber(ids);
    const userExist = await this.prisma.usuario.findUnique({
      where: {
        id,
      },
    });
    ifExist(userExist);
    return userExist;
  }
  async findOneEmailPasswword(email: string, senha:string) {
    const userExist = await this.prisma.usuario.findFirst({
      where: {
        email,
        AND:[{
          senha
        }]
      },
    });
    ifExist(userExist);
    return userExist
  }

  async findOneEmail(email: string) {
    const userExist = await this.prisma.usuario.findFirst({
      where: {
        email,
      },
    });
    ifExist(userExist);
    return userExist
  }

  async update(ids: string, data: UserDto) {
    let id: number = conversorNumber(ids);
    const userExist = await this.prisma.usuario.findUnique({
      where: {
        id,
      },
    });
    ifExist(userExist);
    return await this.prisma.usuario.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(ids: string) {
    let id: number = conversorNumber(ids);
    const userExist = await this.prisma.usuario.findUnique({
      where: {
        id,
      },
    });
    ifExist(userExist);
    return await this.prisma.usuario.delete({
      where: {
        id,
      },
    });
  }
}
