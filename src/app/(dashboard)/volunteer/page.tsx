import Map from "@/components/Map";
import ControlPanel from "@/components/ControlPanel";
import StatsPanel from "@/components/StatsPanel";
import DonationForm from "@/components/DonationForm";

export default function VolunteerPage() {
  return (
    // The layout fix: calc(100vh - 6rem) stops the map from bleeding off the screen
    <div className="relative w-full h-[calc(100vh-6rem)] bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl mt-2">
      
      {/* Bottom Left: Stats */}
      <StatsPanel />

      {/* Bottom Right: Logs */}
      <ControlPanel />

      {/* Top Right: The Real Donation Form */}
      <DonationForm /> 

      {/* Background: Map */}
      <div className="absolute inset-0 z-0">
        <Map />
      </div>
      
    </div>
  );
}