import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { checkRole } from "@/lib/auth/check-role";
import { linkAccount } from "@/lib/auth/link-account";
import { PROFILE_TYPES } from "@/models";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const user = await currentUser();

  const { data, error } = await linkAccount(
    userId,
    user!.primaryEmailAddress!.emailAddress!
  );

  if (error) {
    console.error("LINKACCOUNT", error);
    return notFound();
  }

  if (checkRole([PROFILE_TYPES.ADMIN])) {
    redirect("/board/admin");
  } else if (checkRole([PROFILE_TYPES.STUDENT, PROFILE_TYPES.TEACHER])) {
    redirect("/board/announcement");
  }

  notFound();
}
