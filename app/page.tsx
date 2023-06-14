import Layout from "../components/Layout";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  let href = userId ? "/journal" : "/new-user";

  return (
    <Layout>
      <h1 className="text-6xl">The best journal app, period.</h1>
      <p className="text-2xl text-white/60">This is the best app for tracking your mood throughout your life. All you have to do is be honest.</p>

      <div>
        <Link href={href}>
          <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">Get started</button>
        </Link>
      </div>
    </Layout>
  );
}
