import { EventModel, RecurringEvent, Venue, VenueTable } from "@/data/types";
import { Button, DatePicker, Image, Typography } from "antd";
import { countries } from "country-data";
import { formatDate, isSameDay } from "date-fns";
import { useEffect, useState } from "react";

const { Title, Text, Paragraph } = Typography;
export default function ReservationComponent({ venue }: { venue: Venue }) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [recurringEvent, setRecurringEvent] = useState<
    RecurringEvent | undefined
  >();
  const [ongoingEvent, setOngoingEvent] = useState<EventModel | undefined>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [venueTables, setVenueTables] = useState<VenueTable[]>([])
  useEffect(() => {
    setVenueTables(venue.tables || []);
    const _event = venue.events?.find((value) =>
      isSameDay(value.eventDate, selectedDate)
    );

    setOngoingEvent(_event);
    const _recurringEvent = venue.recurringEvents?.find(
        (value) => value.dayOfWeek === selectedDate.getDay()
      );
   if (_recurringEvent){
    setRecurringEvent(_recurringEvent);
    if (venue.tables){
        setVenueTables([...venue.tables].filter((value) => _recurringEvent.tables.includes(value.id)))
    }
   }
  }, [selectedDate]);

  return (
    <div className="bg-dark text-white rounded-xl p-4">
      <div>
        <div className="flex items-center justify-between gap-4">
          <Title level={4} className="text-white m-0 mb-1">
            Reserve
          </Title>
          <DatePicker
            placeholder="Reservation Date"
            onChange={(date:any) => {
              setSelectedDate(date.toDate());
            }}
            value={selectedDate}
            format={"DD MMM YYYY"}
          />
        </div>
        {recurringEvent && !ongoingEvent && (
          <div className="py-4">
            <Title className="text-current" level={4}>
              Happening on {daysOfWeek[selectedDate.getDay()]}
            </Title>

            <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
              {recurringEvent.poster && (
                <Image
                  src={recurringEvent.poster}
                  className={
                    "aspect-square rounded-lgaspect-square rounded-lg border-solid border-white mb-4 md:mb-0"
                  }
                />
              )}

              <div>
                <Title className="text-current" level={5}>
                  {recurringEvent.name}
                </Title>
                <Text className="text-current">
                  From {recurringEvent.startTime} to {recurringEvent.endTime}
                </Text>
                <Paragraph className="text-current">{recurringEvent.description}</Paragraph>
              </div>
            </div>
          </div>
        )}
       {!ongoingEvent && <table className="text-white w-full mt-4 space-y-5 border-separate border-spacing-y-2">
          <thead>
            <tr>
              <td>
                <Title
                  level={5}
                  className="text-current leading-none font-medium"
                >
                  Table
                </Title>
              </td>
              <td>
                <Title
                  level={5}
                  className="text-current leading-none font-medium"
                >
                  Guests
                </Title>
              </td>
              <td className="text-end">
                <Title
                  level={5}
                  className="text-current leading-none font-medium text-end"
                >
                  Minimum Spend
                </Title>
              </td>
            </tr>
          </thead>
          <tbody className="bg-dark">
            {venue?.tables?.map((table, index) => (
              <tr
                key={index}
                className={`py-4 border-spacing-y-2 rounded-lg ${index === 0 ? "bg-primary" : "bg-gray-500 bg-opacity-50"}`}
              >
                <td className="py-2 px-4 rounded-s-lg">{table.name}</td>
                <td className="py-2 px-4">4</td>
                <td className="py-2 px-4 text-end rounded-e-lg">
                  {
                    countries.all.find(
                      (c) =>
                        c.name.toLocaleLowerCase() ===
                        venue.country.toLocaleLowerCase()
                    )?.currencies[0]
                  }{" "}
                  {table.minimumSpend}
                </td>
              </tr>
            ))}
          </tbody>
        </table>}
        {ongoingEvent && <div className={'py-5'}>
            <Title className="text-current" level={4}>
              Event occurring on {formatDate(selectedDate, 'EEEE, dd MMM YYY')} 
            </Title>

            <Image src={ongoingEvent.poster} className={'aspect-square rounded-lg border-solid border-white mb-4 md:mb-0'}/>
            <Title level={5} className="text-current">{ongoingEvent.eventName}</Title>
            <Text>From {formatDate(ongoingEvent.eventDate, 'hh:mm')} to {ongoingEvent.eventEnd}</Text>
            <Button type="primary" block>View Event</Button>
        </div>
            
        }
        {!ongoingEvent && <Button className="my-3" type="primary" block size="large">Reserve</Button>}
      </div>
    </div>
  );
}
