import { Controller, Post, Delete, Param, Req } from '@nestjs/common';
import { BlockService } from './block/services/block.service';
import { Request } from 'express';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post(':blockedId')
  async block(@Param('blockedId') blockedId: string, @Req() req: Request) {
    const blockerId = req.user.id;
    return this.blockService.blockUser(blockerId, blockedId);
  }

  @Delete(':blockedId')
  async unblock(@Param('blockedId') blockedId: string, @Req() req: Request) {
    const blockerId = req.user.id;
    return this.blockService.unblockUser(blockerId, blockedId);
  }
}
