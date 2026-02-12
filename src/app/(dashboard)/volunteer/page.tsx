import Map from "@/components/Map";
import ControlPanel from "@/components/ControlPanel";
import StatsPanel from "@/components/StatsPanel";
import DonationForm from "@/components/DonationForm"; // <--- 1. Import This

export default function VolunteerPage() {
  return (
    <div className="relative w-full h-screen bg-gray-900">
      
      {/* Top Left: Stats */}
      <StatsPanel />

      {/* Top Right: Logs */}
      <ControlPanel />

      {/* Bottom Center: The Real Donation Form */}
      <DonationForm /> 

      {/* Background: Map */}
      <div className="absolute inset-0 z-0">
        <Map />
      </div>
      
    </div>
  );
}