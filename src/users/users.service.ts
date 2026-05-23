import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private id = 1;

  create(createUserDto: CreateUserDto) {
    const user = { ...createUserDto, id: this.id++ };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, updateUserDto);
    return user;
  }

  remove(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    return { deleted: 'ok' };
  }
}
