import { CreateMeetingWizard } from "@/components/CreateMeetingWizard";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function NewMeetingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user.id)
    .maybeSingle();

  const hostName =
    profile?.display_name ||
    user.user_metadata?.display_name ||
    user.email?.split("@")[0] ||
    "주최자";

  return <CreateMeetingWizard hostName={hostName} userLabel={user.email} />;
}
