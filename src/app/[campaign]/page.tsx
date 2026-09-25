import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { campaigns, getCampaign } from "@/data/campaigns";
import { CampaignLanding } from "@/components/CampaignLanding";

/**
 * Google Ads landing pages (/car-rental, /airport-car-rental, ...).
 * Add an entry to data/campaigns.ts and the page is statically
 * generated at that slug — no code changes needed.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return campaigns.map((c) => ({ campaign: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[campaign]">): Promise<Metadata> {
  const { campaign: slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) return {};
  return {
    title: { absolute: campaign.metaTitle },
    description: campaign.metaDescription,
    alternates: { canonical: `/${campaign.slug}` },
    openGraph: {
      title: campaign.metaTitle,
      description: campaign.metaDescription,
    },
  };
}

export default async function CampaignPage({ params }: PageProps<"/[campaign]">) {
  const { campaign: slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) notFound();
  return <CampaignLanding campaign={campaign} />;
}
