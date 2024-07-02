import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { Cacheable, CacheKey, CacheTTL } from '@nestjs/common';

@Cacheable()
async findOne(id: string): Promise<User> {
  return this.userModel.findById(id).exec();
}

@CacheKey('all_users')
@CacheTTL(60)
async findAll(): Promise<User[]> {
  return this.userModel.find().exec();
}


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(userDto: any): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async updateUser(id: string, userDto: any): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  async searchUsers(username: string, minAge?: number, maxAge?: number): Promise<User[]> {
    const query = {};
    if (username) {
      query['username'] = { $regex: username, $options: 'i' };
    }
    if (minAge || maxAge) {
      const today = new Date();
      const minDate = minAge ? new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate()) : null;
      const maxDate = maxAge ? new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate()) : null;
      query['birthdate'] = {};
      if (minDate) query['birthdate'].$lte = minDate;
      if (maxDate) query['birthdate'].$gte = maxDate;
    }
    return this.userModel.find(query).exec();
  }
}
