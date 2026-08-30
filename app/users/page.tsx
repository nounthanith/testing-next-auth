import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongoose";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  await connectToDatabase();
  const users = await User.find().sort({ createdAt: -1 }).lean();

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12">
      <h1 className="text-3xl font-semibold">All Users</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        {users.length} registered user{users.length === 1 ? "" : "s"}
      </p>

      {users.length === 0 ? (
        <p className="text-zinc-500">No users found yet.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800">
          {users.map((user) => (
            <li
              key={user._id.toString()}
              className="flex items-center gap-4 py-4"
            >
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name ?? "User avatar"}
                  className="h-12 w-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-lg font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {(user.name ?? user.email ?? "?").charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex flex-1 flex-col">
                <span className="font-medium">
                  {user.name ?? "Unnamed user"}
                </span>
                <span className="text-sm text-zinc-500">{user.email}</span>
              </div>
              <span className="text-sm text-zinc-500">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "-"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
