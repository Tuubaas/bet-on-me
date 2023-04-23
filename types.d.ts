// THIS IS A GENERATED FILE. DO NOT MODIFY MANUALLY.
/* eslint-disable */
import { PrismaClient, DateTime } from "@prisma/client";

type Provider = "apple" | "facebook" | "google" | "github" | "email";

type Account = {
  id: string;
  userId: string;
  type: Provider;
  provider: Provider;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
};

type Session = {
  id: string;
  sessionToken: string;
  userId: string;
  expires: DateTime;
};

type VerificationToken = {
  identifier: string;
  token: string;
  expires: DateTime;
};

type Player = {
  id: number;
  userId: string;
  name: string;
  email: string;
  imageSrc: string;
  balance: number;
};

type League = {
  id: number;
  name: string;
};

type PlayersToLeagues = {
  playerId: number;
  leagueId: number;
};

type DateBets = {
  date: DateTime;
};

type Bet = {
  id: number;
  label: string;
  type: string;
  type1x2: Type1X2 | null;
  typeOverUnder: TypeOverUnder | null;
  dateBetsDate?: DateTime | null;
};

type Bet1X2 = {
  id: number;
  label: string;
  type: string;
  type1x2: Type1X2;
  typeOverUnder: null;
  dateBetsDate?: DateTime | null;
};

type BetOverUnder = {
  id: number;
  label: string;
  type: string;
  type1x2: null;
  typeOverUnder: TypeOverUnder;
  dateBetsDate?: DateTime | null;
};

type Type1X2 = {
  id: number;
  one: number;
  x: number;
  two: number;
  betId: number;
};

type TypeOverUnder = {
  id: number;
  over: number;
  under: number;
  betId: number;
};

type PlayerBets = {
  date: DateTime;
  playerId: number;
};

type PlacedBet = {
  id: number;
  choice: string;
  amount: number;
  playerBetsDate?: DateTime | null;
  playerId?: number | null;
};

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified?: DateTime | null;
  image: string;
  accounts: Account[];
  sessions: Session[];
  Player?: Player;
};

export type PrismaClientWithUser = PrismaClient & {
  user: User | null;
};

export type {
  Provider,
  Account,
  Session,
  VerificationToken,
  Player,
  League,
  PlayersToLeagues,
  DateBets,
  Bet,
  Bet1X2,
  BetOverUnder,
  Type1X2,
  TypeOverUnder,
  PlayerBets,
  PlacedBet,
  User,
};
