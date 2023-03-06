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

dayjs().format();

const BetsPage: NextPage<{ session: Session }> = ({ session }) => {
  const [inEditState, setInEditState] = useState(false);
  const [queryDate, setQueryDate] = useState(dayjs().format("DD MMMM"));

  const betsResponse = api.bets.getBets.useQuery({ date: queryDate });
  const playerBetsResponse = api.bets.getPlayerBets.useQuery({
    date: queryDate,
    uid: "test-uid",
  });

  let bets: IGeneralBet[] = [];
  let playerBets: IGeneralPlacedBets | Record<string, never> = {};
  if (betsResponse.data) {
    bets = betsResponse.data.bets;
  }
  if (playerBetsResponse.data) {
    playerBets = playerBetsResponse.data.placedBets;
  }
  if (bets.length < 1) {
    return <div />;
  }
  const toggleEditState = () => {
    setInEditState((currentState) => !currentState);
  };

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
      <main className="flex flex-col text-bom-black">
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
                      bet={bet}
                      placedBet={playerBets[bet.id]}
                    />
                  );
                } else if (bet.type === "1X2") {
                  return (
                    <Bet1X2 key={i} bet={bet} placedBet={playerBets[bet.id]} />
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
  bets: IGeneralBet[] | [];
  playerBets: IGeneralPlacedBets | Record<string, never>;
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
