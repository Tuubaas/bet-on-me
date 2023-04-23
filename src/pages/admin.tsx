import { useState } from "react";
import dayjs from "dayjs";
import { type NextPage } from "next";
import Head from "next/head";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import { api } from "../utils/api";
import { Bet1X2Admin, BetOverUnderAdmin } from "../components";
import {
  type Bet,
  type BetOverUnder,
  type Bet1X2,
  type TypeOverUnder,
  type Type1X2,
} from "types";

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
          <BetAdminForm date={queryDate} bets={betsResponse?.data?.bets} />
        )}
      </main>
    </>
  );
};

export default AdminPage;

interface FormInput {
  bets: Bet[];
}

const BetAdminForm = ({ bets, date }: { bets: Bet[]; date: string }) => {
  const methods = useForm<FormInput>({
    defaultValues: { bets },
  });
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "bets",
  });

  const getBetTypes = (
    type: string,
    id: number
  ): [Type1X2 | null, TypeOverUnder | null] => {
    if (type === "1x2") {
      const newBet: Type1X2 = {
        id: new Date().getTime(),
        one: 0,
        x: 0,
        two: 0,
        betId: id,
      };
      return [newBet, null];
    } else if (type === "over/under") {
      const newBet: TypeOverUnder = {
        id: new Date().getTime(),
        over: 0,
        under: 0,
        betId: id,
      };
      return [null, newBet];
    } else {
      return [null, null];
    }
  };

  const generateUniqueId = (): number => Math.floor(Math.random() * 1e16);

  const handleAddBet = (type: string) => {
    const id = generateUniqueId();
    const [type1x2, typeOverUnder]: [Type1X2 | null, TypeOverUnder | null] =
      getBetTypes(type, id);
    const newBet: Bet = {
      id,
      type,
      label: "",
      type1x2,
      typeOverUnder,
      dateBetsDate: date,
    };
    append(newBet);
  };

  const handleRemoveBet = (index: number) => {
    remove(index);
  };

  /* eslint-disable @typescript-eslint/no-misused-promises */
  return (
    <div>
      <button onClick={() => handleAddBet("1x2")}>Add 1x2 Bet</button>
      <button onClick={() => handleAddBet("over/under")}>
        Add Over/Under Bet
      </button>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <h3>Bet #{index + 1}</h3>
                {field.type === "over/under" ? (
                  <BetOverUnderAdmin
                    key={field.id}
                    bet={field as unknown as BetOverUnder}
                    index={index}
                    onRemove={() => handleRemoveBet(index)}
                  />
                ) : (
                  <Bet1X2Admin
                    key={field.id}
                    bet={field as unknown as Bet1X2}
                    index={index}
                    onRemove={() => handleRemoveBet(index)}
                  />
                )}
              </div>
            );
          })}
          <button type="submit">Save</button>
        </form>
      </FormProvider>
    </div>
  );
  /* eslint-enable @typescript-eslint/no-misused-promises */
};
