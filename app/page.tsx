import { getLandingContent } from "@/app/admin/actions";
import { LandingRoot } from "@/components/landing/landing-root";

export default async function Home() {
  const content = await getLandingContent();
  return <LandingRoot initialContent={content} />;
}
