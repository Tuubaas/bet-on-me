import { type NextPage } from "next";
import { type Session } from "next-auth";
import Head from "next/head";
import { useState } from "react";
import { api } from "../../../utils/api";
import dayjs from "dayjs";
import {
  BetOverUnder,
  Bet1X2,
  BetOverUnderInput,
  Bet1X2Input,
} from "../../../components";
import { type FieldValues, useForm, type SubmitHandler } from "react-hook-form";
import {
  type Bet,
  type BetOverUnder as BetOverUnderType,
  type Bet1X2 as Bet1X2Type,
  type PlacedBet,
} from "types";

dayjs().format();

const BetsPage: NextPage<{ session: Session }> = ({ session }) => {
  const [inEditState, setInEditState] = useState(false);
  const [queryDate, setQueryDate] = useState<string>(dayjs().format("DD MMMM"));

  const betsResponse = api.bets.getBets.useQuery({ date: queryDate });
  const playerBetsResponse = api.bets.getPlayerBets.useQuery({
    date: queryDate,
    uid: 123,
  });

  let bets: Bet[] = [];
  let playerBets: PlacedBet[] | Record<string, never> = {};
  if (betsResponse.data) {
    bets = betsResponse.data.bets;
  }

  if (playerBetsResponse.error) {
    console.log(playerBetsResponse.error);
  }

  if (playerBetsResponse.data) {
    console.log(playerBetsResponse.data);

    playerBets = playerBetsResponse.data.placedBets;
  }
  if (bets.length < 1) {
    return <div />;
  }
  const toggleEditState = () => {
    setInEditState((currentState) => !currentState);
  };
  console.log(playerBets);

  return (
    <>
      <Head>
        <title>Game overview</title>
        <meta
          name="description"
          content="Official page for fake betting game that might be fun idk"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-bom-black flex flex-col">
        Chosen Date: {queryDate}
        <div>
          {inEditState ? (
            <EditBets
              bets={bets}
              playerBets={playerBets}
              toggleEditState={toggleEditState}
            />
          ) : (
            <>
              {bets.map((bet, i) => {
                if (bet.type === "over/under") {
                  return (
                    <BetOverUnder
                      key={i}
                      bet={bet as BetOverUnderType}
                      placedBet={playerBets[bet.id]}
                    />
                  );
                } else if (bet.type === "1X2") {
                  return (
                    <Bet1X2
                      key={i}
                      bet={bet as Bet1X2Type}
                      placedBet={playerBets[bet.id]}
                    />
                  );
                }
              })}
              <button onClick={toggleEditState}>
                {inEditState ? "Save" : "Edit"}
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default BetsPage;

const EditBets: React.FC<{
  bets: Bet[] | [];
  playerBets: PlacedBet[] | Record<string, never>;
  toggleEditState: () => void;
}> = ({ bets, playerBets, toggleEditState }) => {
  const { register, handleSubmit } = useForm({ defaultValues: playerBets });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    //api.bets.updatePlayerBets.useQuery({ uid: "test-uid", bets: [] });
    console.log(data);
    toggleEditState();
  };
  /* eslint-disable @typescript-eslint/no-misused-promises */
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {bets.map((bet, i) => {
        if (bet.type === "over/under") {
          return (
            <BetOverUnderInput
              key={i}
              bet={bet}
              placedBet={playerBets[bet.id]}
              register={register}
            />
          );
        } else if (bet.type === "1X2") {
          return (
            <Bet1X2Input
              key={i}
              bet={bet}
              placedBet={playerBets[bet.id]}
              register={register}
            />
          );
        }
      })}
      <button type="submit">Save</button>
    </form>
  );
  /* eslint-enable @typescript-eslint/no-misused-promises */
};
