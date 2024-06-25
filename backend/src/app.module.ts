import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { RoleController } from './role/role.controller';
import { UserService } from './user/user.service';
import { RoleService } from './role/role.service';
import { User } from './user/user.entity';
import { Role } from './role/role.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12345678',
    database: 'sportsinfo',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
  }),
  TypeOrmModule.forFeature([User, Role]),
  ],
  controllers: [AppController, UserController, RoleController],
  providers: [AppService, UserService, RoleService],
})
export class AppModule {}
