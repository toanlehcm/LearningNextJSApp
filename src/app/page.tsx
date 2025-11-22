import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-3">
      <Link href="/user">User</Link>
      <Link href="/post">Post</Link>
      <Link href="/user-post">User&Post</Link>
      <Link href="/user-provider">User Provider</Link>
      <Link href="/blog">Blog</Link>
    </div>
  );
}
