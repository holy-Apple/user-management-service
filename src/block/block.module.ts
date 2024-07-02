import { Module } from '@nestjs/common';
import { BlockController } from './controllers/block.controller';
import { BlockService } from './services/block.service';

@Module({
  controllers: [BlockController],
  providers: [BlockService]
})
export class BlockModule {}
