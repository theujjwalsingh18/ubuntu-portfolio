import { Desktop } from "@/components/ubuntu/Desktop";
import { AppsProvider } from "@/contexts/AppsContext";
import { SocialsProvider } from "@/contexts/SocialContext";

export default function Home() {
  return (
      <AppsProvider>
        <SocialsProvider>
          <Desktop />
        </SocialsProvider>
      </AppsProvider>
  );
}