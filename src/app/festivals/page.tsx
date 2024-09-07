import BannerCarousel from "@/components/category/bannerCarousel";
import {FestivalAfterParties, FestivalLineup} from "@/components/festivals/featured";

export default function FestivalsPage() {

    return <div>
        <BannerCarousel/>
        <FestivalLineup/>
        <FestivalAfterParties/>
    </div>
}