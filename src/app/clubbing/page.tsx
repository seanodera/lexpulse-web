import BannerCarousel from "@/components/category/bannerCarousel";
import {LateNightClubbing, PartyAllNight} from "@/components/clubbing/featured";


export default function ClubbingPage() {

    return <div className={'bg-dark text-white'}>
        <BannerCarousel/>
        <LateNightClubbing/>
        <PartyAllNight/>
    </div>
}