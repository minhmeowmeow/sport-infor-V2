import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Role } from './role/role.entity';
import { Country } from './country/country.entity';
import { Guest } from './guestbook/guest.entity';
import { News } from './news/news.entity';
import { Player } from './player/player.entity';
import { RecommendScore } from './recommendScore/recommend.entity';
import { Record } from './record/record.entity';
import { Sport } from './sport/sport.entity';
import { SportToCountry } from './sportToCountry/sportcountry.entity';
import { Team } from './team/team.entity';
import { Tournament } from './tournament/tournament.entity';
import { UserService } from './user/user.service';
import { RoleService } from './role/role.service';
import { CountryService } from './country/country.service';
import { GuestService } from './guestbook/guest.service';
import { NewsService } from './news/news.service';
import { PlayerService } from './player/player.service';
import { RecommendService } from './recommendScore/recommend.service';
import { RecordService } from './record/record.service';
import { SportService } from './sport/sport.service';
import { SportToCountryService } from './sportToCountry/sportcountry.service';
import { TeamService } from './team/team.service';
import { TournamentService } from './tournament/tournament.service';
import { UserController } from './user/user.controller';
import { RoleController } from './role/role.controller';
import { CountryController } from './country/country.controller';
import { GuestController } from './guestbook/guest.controller';
import { NewsController } from './news/news.controller';
import { PlayerController } from './player/player.controller';
import { RecommendController } from './recommendScore/recommend.controller';
import { RecordController } from './record/record.controller';
import { SportController } from './sport/sport.controller';
import { SportToCountryController } from './sportToCountry/sportcountry.controller';
import { TeamController } from './team/team.controller';
import { TournamentController } from './tournament/tournament.controller';


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
  TypeOrmModule.forFeature([User, Role, Country, Guest, News, Player, RecommendScore, Record, Sport, SportToCountry, Team, Tournament]),
  ],
  controllers: [AppController, UserController, RoleController, CountryController, GuestController, NewsController, 
    PlayerController, RecommendController, RecordController, SportController, 
    SportToCountryController, TeamController, TournamentController],
  providers: [AppService, UserService, RoleService, CountryService, GuestService, NewsService, 
    PlayerService, RecommendService, RecordService, SportService, 
    SportToCountryService, TeamService, TournamentService],
})
export class AppModule {}
