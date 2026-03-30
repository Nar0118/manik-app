import { readSession } from "@/lib/auth";
import { HeaderNav } from "@/components/header-nav";

export async function Header() {
  const session = await readSession();
  const user = session ? { email: session.email } : null;
  return <HeaderNav user={user} />;
}
