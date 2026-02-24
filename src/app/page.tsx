"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth";

import { PublicHeader } from "@/components/church/PublicHeader";
import { PublicFooter } from "@/components/church/PublicFooter";
import { HeroSection } from "@/components/church/HeroSection";
import { AboutSection } from "@/components/church/AboutSection";
import { EventsSection } from "@/components/church/EventsSection";
import { GiveSection } from "@/components/church/GiveSection";
import { ContactSection } from "@/components/church/ContactSection";
import { LoginPage } from "@/components/church/LoginPage";

import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/Header";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { MembersSection } from "@/components/dashboard/MembersSection";
import { DashboardEventsSection } from "@/components/dashboard/EventsSection";
import { AttendanceSection } from "@/components/dashboard/AttendanceSection";
import { FinanceSection } from "@/components/dashboard/FinanceSection";
import { MessagesSection } from "@/components/dashboard/MessagesSection";
import { ReportsSection } from "@/components/dashboard/ReportsSection";
import { SettingsSection } from "@/components/dashboard/SettingsSection";
import { MobileBottomNav } from "@/components/dashboard/MobileBottomNav";

function AppContent() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const searchParams = useSearchParams();

  const urlView = searchParams.get("view");

  const view = useMemo(() => {
    if (isAuthenticated) return "dashboard";
    if (urlView === "login") return "login";
    return "public";
  }, [isAuthenticated, urlView]);

  const tabTitles: Record<string, string> = {
    dashboard: "Dashboard",
    members: "Members",
    events: "Events & Services",
    attendance: "Attendance",
    messages: "Messages",
    finance: "Finance",
    reports: "Reports",
    settings: "Settings",
  };

  if (view === "public") {
    return (
      <div className="min-h-screen flex flex-col pb-16 md:pb-0">
        <PublicHeader />
        <main className="flex-1">
          <HeroSection />
          <AboutSection />
          <EventsSection />
          <GiveSection />
          <ContactSection />
        </main>
        <PublicFooter />
        <MobileBottomNav />
      </div>
    );
  }

  if (view === "login") {
    return <LoginPage onSwitchToPublic={() => (window.location.href = "/")} />;
  }

  return (
    <div className="min-h-screen flex bg-muted/30">
      <DashboardSidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <DashboardHeader
          onMenuClick={() => setIsMobileSidebarOpen(true)}
          title={tabTitles[currentTab] || "Dashboard"}
        />

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {currentTab === "dashboard" && <DashboardOverview />}
          {currentTab === "members" && <MembersSection />}
          {currentTab === "events" && <DashboardEventsSection />}
          {currentTab === "attendance" && <AttendanceSection />}
          {currentTab === "messages" && <MessagesSection />}
          {currentTab === "finance" && <FinanceSection />}
          {currentTab === "reports" && <ReportsSection />}
          {currentTab === "settings" && <SettingsSection />}
        </main>

        <MobileBottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
    </div>
  );
}

export default function ChurchManagementSystem() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <AppContent />
    </Suspense>
  );
}
