import Link from "next/link";

export default async function Page() {
  const posts = [
    {
      id: 1,
      title: "Hello World",
    },
    {
      id: 2,
      title: "Hi World",
    },
  ];
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
