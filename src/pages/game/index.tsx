import {
  type NextPage,
  type GetServerSideProps,
  type GetServerSidePropsContext,
} from "next";
import { type Session } from "next-auth";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";

import { api } from "../../utils/api";

const GamePage: NextPage<{ session: Session }> = ({ session }) => {
  let uid, imageSrc, name, email, balance;
  let leagues: ILeague[] | [] = [];

  const userResponse = api.player.getPlayer.useQuery({ uid: "test ID" });
  const leaguesResponse = api.league.getPlayerLeagues.useQuery({
    uid: "test ID",
  });

  if (userResponse.data) {
    ({
      uid: uid,
      imageSrc: imageSrc,
      name: name,
      email: email,
      balance: balance,
    } = userResponse.data.user);
  }
  if (leaguesResponse.data) {
    ({ leagues: leagues } = leaguesResponse.data);
  }

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
        <h1>Bet on me</h1>
        <div className="flex flex-row">
          <div>
            {imageSrc ? (
              <Image
                className="h-32 w-32 rounded-full"
                src={imageSrc}
                alt="Profile picture"
              />
            ) : (
              <div className="h-32 w-32 rounded-full bg-bom-black" />
            )}
          </div>
          <div className="flex flex-col">
            <span>
              {name} - {uid}
            </span>
            <span>{email}</span>
            <span>{balance}</span>
          </div>
        </div>
        <div>
          {leagues.map(({ id, name, podium }) => {
            return (
              <div key={id}>
                <span>{name}</span>
                <div className="flex flex-col">
                  {podium.map(({ name }, index) => {
                    return <span key={index}>{`${index}. ${name}`}</span>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default GamePage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  //   if (!session) {
  //     return {
  //       redirect: {
  //         destination: "/",
  //         permanent: false,
  //       },
  //     };
  //   }

  return {
    props: { session },
  };
};
