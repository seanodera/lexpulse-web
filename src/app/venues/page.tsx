import TrendingVenues from "@/components/venues/trendingVenues";
import VenuesBanner from "@/components/venues/venuesBanner";

export default function VenuesPage() {
  return (
    <div>
      <VenuesBanner />
      <div className="space-y-8 px-4 md:px-16 py-8">
        <TrendingVenues />
      </div>
    </div>
  );
}
