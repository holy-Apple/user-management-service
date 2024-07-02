import { CacheModule, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BlockModule } from './block/block.module';
import { DatabaseModule } from './database/database.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtMiddleware } from './jwt/jwt.middleware';

@Module({
  imports: [
    CacheModule.register(),
    UserModule,
    BlockModule,
    DatabaseModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}

