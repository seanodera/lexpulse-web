import ComedyBanner from "@/components/comedy/banner";
import {UpcomingComedy} from "@/components/comedy/upcoming";
import {ComedyClubs, FeaturedComedy, WeekendLaughs} from "@/components/comedy/featured";



export default function ComedyPage() {

    return <div>
        <ComedyBanner/>
        <FeaturedComedy/>
        <WeekendLaughs/>
        <UpcomingComedy/>
        <ComedyClubs/>

    </div>
}