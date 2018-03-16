import { Passport } from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { secretOrKey } from "./common";
import { Users } from "../modules/users/users.entity";
import { getConnection } from "typeorm";

const entityManager = getConnection().manager;

const jwtOptions = {
  secretOrKey: secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtAuth = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  const user = await entityManager.findOneById(jwtPayload._id, Users);

  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
});

const passport = new Passport();
passport.use(jwtAuth);