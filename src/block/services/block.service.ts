import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Block } from './schemas/block.schema';

@Injectable()
export class BlockService {
  constructor(@InjectModel(Block.name) private blockModel: Model<Block>) {}

  async blockUser(blocker: string, blocked: string): Promise<Block> {
    const block = new this.blockModel({ blocker, blocked });
    return block.save();
  }

  async unblockUser(blocker: string, blocked: string): Promise<Block> {
    return this.blockModel.findOneAndDelete({ blocker, blocked }).exec();
  }
}
