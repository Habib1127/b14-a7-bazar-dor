import AuthShell from "@/components/AuthShell";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { requireSession } from "@/lib/session";

export default async function UpdateProfilePage() {
  const session = await requireSession("/profile/update");
  return (
    <AuthShell title="তথ্য আপডেট করুন" subtitle="আপনার নাম পরিবর্তন করুন।">
      <UpdateProfileForm currentName={session.user.name} />
    </AuthShell>
  );
}
