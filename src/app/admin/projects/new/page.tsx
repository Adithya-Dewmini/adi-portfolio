import { redirect } from "next/navigation";

export default function NewProjectPage() {
  redirect("/admin/content/projects/new");
}
