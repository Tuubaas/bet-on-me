enum BetType {
  Type1X2 = "1X2",
  TypeOverUnder = "over/under",
}

interface IBet<T extends BetType> extends IBetType<T> {
  id: string;
  label: string;
}

interface IBetType<T extends BetType> {
  type: T;
}

interface IBet1X2 extends IBet<BetType.Type1X2> {
  odds: { one: number; x: number; two: number };
}
interface IBetOverUnder extends IBet<BetType.TypeOverUnder> {
  odds: { over: number; under: number };
}

type TBetType = BetType.Type1X2 | BetType.TypeOverUnder;

interface IGeneralBet {
  id: string;
  label: string;
  type: TBetType;
  odds: {
    one?: number;
    x?: number;
    two?: number;
    over?: number;
    under?: number;
  };
}

interface IGeneralPlacedBets {
  [key: string]: PlacedBet;
}

type PlacedBet =
  | {
      choice: string;
      amount: number;
    }
  | undefined;

interface ILeague {
  id: string;
  name: string;
  podium: { name: string }[];
}
