import { v4 as uuidv4 } from 'uuid'
// Function to generate fake events using Faker
import {faker} from "@faker-js/faker";
import {EventModel, EventType, Ticket} from "@/data/types";

export function generateEvents(count: number): EventModel[] {
    const events: EventModel[] = [];

    for (let i = 0; i < count; i++) {
        const eventType = faker.helpers.objectValue(EventType); // Random event category
        const ticketCount = faker.number.int({ min: 1, max: 3 }); // Generate 1 to 3 ticket types per event

        // Generate tickets
        const tickets: Ticket[] = Array.from({ length: ticketCount }, () => ({
            name: faker.commerce.productName(),
            price: faker.number.float({ min: 10, max: 300, multipleOf: 0.01 }),
            description: faker.lorem.sentence(),
            stock: faker.number.int({ min: 50, max: 1000 }),
        }));

        // Generate event details
        const event: EventModel = {
            name: faker.company.catchPhraseNoun(),
            poster: faker.image.urlLoremFlickr({ category:'poster'}), // Event poster
            date: faker.date.future(), // Random future date
            location: faker.location.city() + ', ' + faker.location.country(),
            price: faker.number.float({ min: 20, max: 500, multipleOf: 0.01 }), // Base price
            cover: faker.image.urlLoremFlickr({category: 'concert'}), // Event cover image
            id: uuidv4(), // Unique event ID
            category: eventType as EventType, // Random event category
            tickets: tickets, // Tickets array
            description: faker.lorem.sentence(),
            venue: {
                name: faker.word.noun(),
                street: faker.location.streetAddress(),
                saved:false,
            }
        };

        events.push(event);
    }

    return events;
}