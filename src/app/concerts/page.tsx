import BannerCarousel from "@/components/category/bannerCarousel";
import {FeaturedConcerts, UpcomingConcerts} from "@/components/concerts/featured";


export default function ConcertsPage() {
    return (
        <div>
            <BannerCarousel/>
            <UpcomingConcerts/>
            <FeaturedConcerts/>
        </div>
    );
}
