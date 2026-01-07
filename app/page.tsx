import { getLandingContent } from "@/app/admin/actions";
import { LandingRoot } from "@/components/landing/landing-root";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const content = await getLandingContent();
  return <LandingRoot initialContent={content} />;
}
