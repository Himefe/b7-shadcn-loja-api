import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (
        config: ConfigService,
      ): PostgresConnectionOptions & { autoLoadEntities: boolean } => ({
        type: config.getOrThrow<PostgresConnectionOptions['type']>('DB_TYPE'),
        host: config.getOrThrow('DB_HOST'),
        port: parseInt(config.getOrThrow('DB_PORT'), 10),
        username: config.getOrThrow('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.getOrThrow('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
