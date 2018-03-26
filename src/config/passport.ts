import { Passport } from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from 'passport-local'
import { secretOrKey } from "./common";
import { Users } from "../modules/users/users.entity";
import { getConnection } from "typeorm";

const entityManager = getConnection().manager;

// local auth
const localOptions = { usernameField: 'email', passwordField: 'password' };
const localAuth = new LocalStrategy(localOptions, async (username, password, done) => {
  const user = await entityManager.findOne(Users, { email: username });
  if (!user) { return done(null, false); }

  // TODO: compare pwd
  return done(null, user);
});

// jwt auth
const jwtOptions = {
  secretOrKey: secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtAuth = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  const user = await entityManager.findOneById(jwtPayload._id, Users);

  if (!user) { return done(null, false); }
  return done(null, user);
});

const passport = new Passport();
passport.use(localAuth);
passport.use(jwtAuth);