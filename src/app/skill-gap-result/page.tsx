// src/app/skill-gap-result/page.tsx
"use client";

import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/LoadingScreen";

// Import komponen secara dinamis dan matikan Server-Side Rendering (SSR)
const SkillGapContent = dynamic(
  () => import("@/components/SkillGapComponent"),
  {
    ssr: false, // Ini kuncinya agar tidak error localStorage saat build
    loading: () => <LoadingScreen />,
  }
);

export default function SkillGapResultPage() {
  return <SkillGapContent />;
}
