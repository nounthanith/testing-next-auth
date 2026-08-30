import Link from "next/link";

export default function Home() {
  return <div className="flex gap-2 capitalize">{["login", "users",].map((item) => (
    <Link key={item} href={item}>{item}</Link>
  ))}</div>
}