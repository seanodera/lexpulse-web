
// Function to generate fake events using Faker
import {faker} from "@faker-js/faker";
import {EventModel, EventType, EventTypeList, Ticket, Venue, VenueTable, VenueTypeList} from "./types";



function generateVenue(id?:  string): Venue {
    const finalId = id? id: faker.string.uuid();
    return {
        _id: finalId,
        name: faker.company.name(),
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        district: faker.location.county(),
        country: ['Kenya', 'Ghana'][faker.number.int({ min: 0, max: 1 })],
        links: [
            {
                name: "Website",
                url: faker.internet.url()
            },
            {
                name: "Facebook",
                url: faker.internet.url()
            }
        ],
        followers: faker.number.int({ min: 0, max: 10000 }),
        images: [
            faker.image.urlPicsumPhotos(),
            faker.image.urlPicsumPhotos(),
            faker.image.urlPicsumPhotos(),
            faker.image.urlPicsumPhotos()
        ],
        capacity: faker.number.int({ min: 50, max: 1000 }),
        type:VenueTypeList[faker.number.int({min:0 , max: VenueTypeList.length - 1})],
        yearEvents: faker.number.int({ min: 0, max: 100 }),
        description: faker.lorem.paragraph(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        poster: faker.image.urlPicsumPhotos(),
        userId: faker.string.uuid(),
        events: Array.from({length: 5}, () => generateEvent(finalId)),
        tables: Array.from({length: 5}, () => generateVenueTable()),
        recurringEvents: [
    
        ]
    };
}

export function generateEvent(venueId?:string): EventModel {
    return {
        subCategory: faker.commerce.department(),
        image: [
            faker.image.urlPicsumPhotos(),
            faker.image.urlPicsumPhotos(),
            faker.image.urlPicsumPhotos(),
            faker.image.urlPicsumPhotos()
        ],
        viewCount: faker.number.int({ min: 0, max: 10000 }),
        weightedRating: faker.number.float({ min: 0, max: 5 }),
        ticketSales: faker.number.int({ min: 0, max: 1000 }),
        eventName: faker.company.name(),
        eventHostId: faker.string.uuid(),
        poster: faker.image.urlPicsumPhotos(),
        eventDate: faker.date.future(),
        location: faker.location.streetAddress(),
        cover: faker.image.urlPicsumPhotos(),
        _id: faker.string.uuid(),
        description: faker.lorem.paragraph(),
        category: EventTypeList[faker.number.int({min: 0, max: EventTypeList.length-1})],
        ticketInfo: generateTickets(), // Populate with Ticket objects as needed
        discount: [], // Populate with Discount objects as needed
        createdAt: faker.date.past(),
        startSalesDate: faker.date.future(),
        endSalesDate: faker.date.future(),
        eventEnd: faker.date.future().toISOString(),
        minAge: faker.number.int({ min: 18, max: 21 }),
        dress: faker.lorem.word(),
        lastEntry: faker.date.future().toISOString(),
        country: faker.location.country(),
        currency: faker.finance.currencyCode(),
        approved: faker.datatype.boolean(),
        venue: {
            name: faker.company.name(),
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            country: faker.location.country(),
            district: faker.location.county(),
            saved: faker.datatype.boolean(),
            id: venueId? venueId: faker.string.uuid(),
        },
        revenue: faker.number.int({ min: 0, max: 100000 }),
        scanners: [], // Populate with Scanner objects as needed
    };
}


export function generateTickets(): Ticket[] {
    return Array.from({ length: 3 }, () => ({
        _id: faker.string.uuid(),
        ticketType: faker.commerce.productName(),
        price: faker.number.int({ min: 10, max: 100 }),
        ticketsAvailable: faker.number.int({ min: 50, max: 500 }),
        ticketsLeft: faker.number.int({ min: 0, max: 50 }),
        sold: faker.number.int({ min: 0, max: 50 }),
        saleEnd: faker.date.future(),
        saleStart: faker.date.past(),
    }));
}
export function generateVenueTable(): VenueTable {
    return {
        name: faker.commerce.productName(),
        venueId: faker.string.uuid(),
        description: faker.lorem.sentence(),
        minimumSpend: faker.number.int({ min: 0, max: 1000 }),
        available: faker.number.int({ min: 0, max: 10 }),
    };
}
export default generateVenue;