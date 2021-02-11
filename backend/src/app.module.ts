import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterModule } from './register/register.module';
import { LoginService } from './login/login.service';
import { LoginController } from './login/login.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      // TODO: use configs
      type: 'mysql',
      host: 'mysqldb',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'letx',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    RegisterModule,
  ],
  controllers: [AppController, LoginController],
  providers: [AppService, LoginService],
})
export class AppModule {}
