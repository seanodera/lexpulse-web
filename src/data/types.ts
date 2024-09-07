// Define the EventType enum
import {FinalColor} from "extract-colors/lib/types/Color";

export enum EventType {
    'clubbing',
    'comedy',
    'festival',
    'concerts',
    'sports',
    'theater',
    'conference',
    'exhibition',
    'workshop',
    'seminar',
    'movie',
}

// Define the Ticket type
export interface Ticket {
    name: string;
    price: number;
    description: string;
    stock: number;
}

// Define the EventModel type
export interface EventModel {
    name: string;
    poster: string;
    date: Date; // Using Date object for better date manipulation
    location: string;
    price: number;
    cover: string;
    id: string;
    description: string;
    category: EventType;
    tickets: Ticket[];
    venue: {
        name: string;
        street: string;
        saved: boolean;
        id?: string;
    };
}

export interface Venue {
    id: string;
    name: string;
    street: string;
    city: string;
    country: string;
    links: { name: string, url: string }[];
    followers: number;
    cover: string;

}

export interface Palette {
    vibrant: FinalColor | null;
    dominant: FinalColor | null;
    background: FinalColor | null;
    lightVibrant: FinalColor | null,
    darkVibrant: FinalColor | null,
    lightMuted: FinalColor | null,
    muted: FinalColor | null,
    darkMuted: FinalColor | null
}

export interface FinalPalette {
    background: FinalColor | null;
    textColor: FinalColor | null;
    buttonColor: FinalColor | null;
}