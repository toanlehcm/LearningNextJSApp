import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-2">
      <Link href="/user">User</Link>
      <Link href="/post">Post</Link>
      <Link href="/blog">Blog</Link>
    </div>
  );
}
