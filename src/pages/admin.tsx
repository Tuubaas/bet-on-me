import { useState } from "react";
import dayjs from "dayjs";
import { type NextPage } from "next";
import Head from "next/head";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";

import { api } from "../utils/api";
import { BetType } from "../utils/enums";
import { Bet1X2Admin, BetOverUnderAdmin } from "../components";

dayjs().format();

const AdminPage: NextPage = () => {
  const [queryDate, setQueryDate] = useState<string>(dayjs().format("DD MMMM"));

  const betsResponse = api.bets.getBets.useQuery({ date: queryDate });

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
      <main>
        Chosen date: {queryDate}
        {betsResponse?.data?.bets && (
          <Form queryDate={queryDate} bets={betsResponse.data?.bets} />
        )}
      </main>
    </>
  );
};

export default AdminPage;

const Form: React.FC<{ queryDate: string; bets: IGeneralBet[] }> = ({
  queryDate,
  bets,
}) => {
  const mutation = api.bets.setBets.useMutation();

  const attributes = useForm({
    defaultValues: { bets },
    mode: "onChange",
  });

  const { control, handleSubmit } = attributes;
  const { fields, append, remove } = useFieldArray({ control, name: "bets" });

  const onSubmit = handleSubmit((data) => {
    const submitResponse = mutation.mutate({
      date: queryDate,
      bets: data.bets,
    });
    console.log(submitResponse);
  });

  const createBet = (type: BetType): IGeneralBet => {
    const id = Math.random().toString().slice(2);
    if (type === BetType.Type1X2) {
      return {
        id,
        type,
        label: "",
        odds: { one: 1, x: 1, two: 1 },
      };
    } else if (type === BetType.TypeOverUnder) {
      return {
        id,
        type,
        label: "",
        odds: { over: 1, under: 1 },
      };
    }
    return {
      id,
      type: BetType.TypeOverUnder,
      label: "",
      odds: { over: 1, under: 1 },
    };
  };

  const addBet = (type: BetType) => {
    const newBet = createBet(type);
    append(newBet);
  };

  const removeBet = (index: number) => {
    remove(index);
  };
  /* eslint-disable @typescript-eslint/no-misused-promises */
  return (
    <>
      <FormProvider {...attributes}>
        <form onSubmit={onSubmit}>
          {fields.map((field, index) => {
            if (field.type === "over/under") {
              const bet = field as IBetOverUnder;
              return (
                <BetOverUnderAdmin
                  key={index}
                  bet={bet}
                  index={index}
                  removeBet={() => removeBet(index)}
                />
              );
            } else if (field.type === "1X2") {
              const bet = field as IBet1X2;
              return (
                <Bet1X2Admin
                  key={index}
                  bet={bet}
                  index={index}
                  removeBet={() => removeBet(index)}
                />
              );
            }
          })}
          <button className="mt-4" type="submit">
            Submit
          </button>
        </form>
      </FormProvider>
      <button className="mr-4" onClick={() => addBet(BetType.Type1X2)}>
        Add 1X2 bet
      </button>
      <button onClick={() => addBet(BetType.TypeOverUnder)}>
        Add Over/Under bet
      </button>
    </>
  );
  /* eslint-enable @typescript-eslint/no-misused-promises */
};
