import { auth, currentUser } from "@clerk/nextjs/server";

export default async function TestLoginPage() {
  const session = await auth();
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
