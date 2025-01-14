import store from "@/data/store";


export enum EventType {
    Clubbing = "clubbing",
    Comedy = "comedy",
    Festival = "festival",
    Concerts = "concerts",
    Sports = "sports",
    Theater = "theater",
    Conference = "conference",
    Exhibition = "exhibition",
    Workshop = "workshop",
    Seminar = "seminar",
    Movie = "movie",
}

export enum VenueType {
    ConcertHall = "Concert Hall",
    Theater = "Theater",
    Stadium = "Stadium",
    ConferenceCenter = "Conference Center",
    OutdoorPark = "Outdoor Park",
    Nightclub = "Nightclub",
    ArtGallery = "Art Gallery",
    Museum = "Museum",
    BanquetHall = "Banquet Hall",
    ExhibitionCenter = "Exhibition Center",
    HotelBallroom = "Hotel Ballroom",
    SportsArena = "Sports Arena",
    CivicCenter = "Civic Center",
    Beach = "Beach",
    Rooftop = "Rooftop",
    CommunityCenter = "Community Center",
    Amphitheater = "Amphitheater",
    PrivateResidence = "Private Residence",
    RestaurantBar = "Restaurant/Bar",
    Garden = "Garden",
    Warehouse = "Warehouse",
    Arena = "Arena",
    ShoppingMall = "Shopping Mall",
    ConventionHall = "Convention Hall",
    Cafe = "Café"
}

// Extract constant array for potential reuse and increased readability
export const EventTypeList = [
    EventType.Clubbing,
    EventType.Comedy,
    EventType.Festival,
    EventType.Concerts,
    EventType.Sports,
    EventType.Theater,
    EventType.Conference,
    EventType.Exhibition,
    EventType.Workshop,
    EventType.Seminar,
    EventType.Movie
];

export const VenueTypeList = [
    VenueType.ConcertHall,
    VenueType.Theater,
    VenueType.Stadium,
    VenueType.ConferenceCenter,
    VenueType.OutdoorPark,
    VenueType.Nightclub,
    VenueType.ArtGallery,
    VenueType.Museum,
    VenueType.BanquetHall,
    VenueType.ExhibitionCenter,
    VenueType.HotelBallroom,
    VenueType.SportsArena,
    VenueType.CivicCenter,
    VenueType.Beach,
    VenueType.Rooftop,
    VenueType.CommunityCenter,
    VenueType.Amphitheater,
    VenueType.PrivateResidence,
    VenueType.RestaurantBar,
    VenueType.Garden,
    VenueType.Warehouse,
    VenueType.Arena,
    VenueType.ShoppingMall,
    VenueType.ConventionHall,
    VenueType.Cafe
]

export interface EventModel {
    eventName: string;
    eventHostId: string;
    poster: string;
    eventDate: Date; // Event date
    location: string;
    // price: number;
    cover: string;
    _id: string;
    description: string;
    category: EventType;
    ticketInfo: Ticket[];
    discount?: Discount[];
    createdAt: Date;
    startSalesDate?: Date; // Optional
    endSalesDate?: Date; // Optional
    eventEnd?: string; // Optional
    minAge?: number; // Optional minimum age restriction
    dress?: string; // Optional dress code
    lastEntry?: string;
    country: string;
    currency: string;
    approved: boolean;
    venue: {
        name: string;
        street: string;
        city: string;
        country: string;
        district: string;
        saved: boolean;
        id?: string;
    };
}

export interface Ticket {
    _id: string;
    ticketType: string;
    price: number;
    ticketsAvailable: number;
    ticketsLeft: number;
    sold: number;
    saleEnd?: Date; // Optional
    saleStart?: Date; // Optional
}

export interface Discount {
    id: string;
    ticketIds: string[];
    type: 'FlatRate' | 'Percentage';
    value: number;
    start: Date;
    end: Date;
}

export interface Venue {
    id: string;
    name: string;
    street: string;
    city: string;
    district: string;
    country: string;
    links: { name: string, url: string }[];
    followers: number;
    cover: string;
    capacity: number;
    type: VenueType;
    yearEvents: number | 0;
    description?: string;
    phone: string;
    email: string;
}

export interface CartItem {
    id: string;
    name: string;
    amount: number;
    price: number;
}



export interface Purchase {
    eventId: string;
    attendeeId: string;
    paymentMethod?: string;
    ticketInfo: { ticketType: string, numberOfTickets: number}[ ];
    totalPrice?: number;
    amountPaid?: number;
    status?: string;
    paymentId?: string;
    createdAt: Date;
    _id: string;
}



export interface CombinedTicket {
    _id: string;
    eventId: EventModel;
    attendeeId: string;
    paymentMethod: string;
    ticketInfo: {
        _id: string;
        ticketType: string;
        numberOfTickets: number;
    }[];
    totalPrice: number;
    status: string;
    scanned: boolean;
    createdAt: string;
    amountPaid: number;
}

export interface OperationType {
    operationType: string;
    minTransactionLimit: string;
    maxTransactionLimit: string;
}

export interface Correspondent {
    correspondent: string;
    currency: string;
    ownerName: string;
    operationTypes: OperationType[];
}

export interface PawaPayCountryData {
    country: string;
    correspondents: Correspondent[];
}
