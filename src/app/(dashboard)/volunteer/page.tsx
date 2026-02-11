import Map from "@/components/Map";
import ControlPanel from "@/components/ControlPanel"; // <--- Import the new component
import StatsPanel from "@/components/StatsPanel";

export default function VolunteerPage() {
  return (
    <div className="relative w-full h-screen bg-gray-900">
      
      {/* The God View Overlay (High Z-Index) */}
      <ControlPanel />
      <StatsPanel />

      {/* The Map (Background) */}
      <div className="absolute inset-0 z-0">
        <Map />
      </div>
      
    </div>
  );
}