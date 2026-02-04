import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import SignOutButton from "./SignOutButton"

export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session) redirect("/")

  return (
    <div>
      <h1>Welcome to Dashboard</h1>

      <p>Logged in as: {session.user?.email}</p>

      <SignOutButton />
    </div>
  )
}
