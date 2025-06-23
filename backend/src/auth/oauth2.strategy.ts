import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-oauth2";
import axios from "axios";

@Injectable()
export class OAuth2Strategy extends PassportStrategy(Strategy, "oauth2") {
  constructor(configService: ConfigService) {
    super({
      authorizationURL: configService.get<string>("GOOGLE_AUTHORIZATION_URL"),
      tokenURL: configService.get<string>("GOOGLE_TOKEN_URL"),
      clientID: configService.get<string>("GOOGLE_CLIENT_ID"),
      clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET"),
      callbackURL: configService.get<string>("GOOGLE_CALLBACK_URL"),
      scope: ["profile", "email"],
    });
  }

  async validate(accessToken: string): Promise<any> {
    try {
      const { data } = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const user = {
        id: data.id,
        email: data.email,
        name: data.name,
        picture: data.picture,
      };

      return user;
    } catch (error) {
      console.error(
        "Error fetching Google user info:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}
