import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard")
  return <div className="ml-2">Nothing Happend</div>;
}
