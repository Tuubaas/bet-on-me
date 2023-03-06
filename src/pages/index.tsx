import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData);

  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  console.log(hello.data);

  return (
    <>
      <Head>
        <title>Bet on me!</title>
        <meta
          name="description"
          content="Official page for fake betting game that might be fun idk"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-l from-[#434343] to-[#000000]">
        <h1>Bet on Me</h1>
        {sessionData ? (
          <>
            <Link href="/game">Go to game</Link>
            <button
              className="border-bom-white bg-bom-black text-bom-white rounded-xl py-4 px-8"
              onClick={() => void signOut}
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <p className="text-bom-white">
              Spela spelet! Du behöver bara logga in först, med antingen google,
              facebook eller gmail.
            </p>
            <AuthLink />
          </>
        )}
      </main>
    </>
  );
};

export default Home;

const AuthLink: React.FC = () => {
  return (
    <button
      className="border-bom-white bg-bom-black text-bom-white rounded-xl py-4 px-8"
      onClick={() => void signIn()}
    >
      Sign In
    </button>
  );
};
