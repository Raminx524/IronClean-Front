import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const WORKDAYS_URL = "http://localhost:3000/api/cleaners/{id}/workdays";
const RESERVATIONS_URL = "http://localhost:3000/api/cleaners/{id}/reservations";

export async function fetchWorkdays(cleanerId: number) {
  const { data } = await axios.get(
    WORKDAYS_URL.replace("{id}", cleanerId.toString())
  );
  return data; // Expected to return an array of available dates
}

export async function fetchReservations(cleanerId: number, date: string) {
  const { data } = await axios.get(
    RESERVATIONS_URL.replace("{id}", cleanerId.toString()),
    {
      params: { date },
    }
  );
  return data; // Expected to return an array of existing reservations for the selected date
}

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar"; // Example calendar component
import { useParams } from "react-router-dom";
import { AvailableTimeSlots } from "./AvailableTimeSlots";

type DateRange = [Date, Date] | null; // Adjust according to your DateRange type
type SelectRangeEventHandler = (range: DateRange) => void;

export function ReservationsCalendar() {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSelectDate: SelectRangeEventHandler = (range) => {
    if (range && range[0]) {
      // If range is defined and has a start date, use it
      setSelectedDate(range[0]);
    } else {
      // If range is undefined, set selectedDate to null
      setSelectedDate(null);
    }
  };

  const { data: workdays, isLoading: workdaysLoading } = useQuery({
    queryKey: [`cleaner${id}-workdays`],
    queryFn: () => fetchWorkdays(parseInt(id!)),
  });

  if (workdaysLoading) return <p>Loading available dates...</p>;

  return (
    <div>
      <h2>Select an Available Date</h2>
      <Calendar availableDates={workdays} onSelect={handleSelectDate} />
      {selectedDate && (
        <AvailableTimeSlots cleanerId={parseInt(id!)} date={selectedDate} />
      )}
    </div>
  );
}

// function ReservationsCalendar() {
//   return <div>ReservationsCalendar</div>;
// }

// export default ReservationsCalendar;
