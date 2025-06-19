import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { VideoModule } from "./video/video.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { EventModule } from "./events/event.module";
import { ElasticSearchModule } from './elastic-search/elastic-search.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>("MONGODB_URI"),
        connectionFactory: (connection) => {
          connection.on("connected", () =>
            console.log("✅ MongoDB connected successfully")
          );
          connection.on("error", (err: any) =>
            console.error("❌ MongoDB connection error:", err.message)
          );
          return connection;
        },
      }),
    }),
    VideoModule,
    UserModule,
    AuthModule,
    EventModule,
    ElasticSearchModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
