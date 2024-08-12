import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar"; // Example calendar component
import { useParams } from "react-router-dom";
import { AvailableTimeSlots } from "./AvailableTimeSlots";
import { format } from "date-fns"; // Assuming you're using date-fns or similar library
import api from "@/services/api.service";

const WORKDAYS_URL = "/cleaners/{id}/days";
const RESERVATIONS_URL = "/cleaners/{id}/reservations";

export async function fetchWorkdays(cleanerId: number) {
  const { data } = await api.get(
    WORKDAYS_URL.replace("{id}", cleanerId.toString())
  );
  return data; // Expected to return an array of available dates
}

export async function fetchReservations(cleanerId: number, date: string) {
  const { data } = await api.get(
    RESERVATIONS_URL.replace("{id}", cleanerId.toString()) + "/reserv",
    {
      params: { date },
    }
  );
  return data; // Expected to return an array of existing reservations for the selected date
}

export function ReservationsCalendar() {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const { data: workdays, isLoading: workdaysLoading } = useQuery({
    queryKey: [`cleaner${id}-workdays`],
    queryFn: () => fetchWorkdays(parseInt(id!)),
  });

  if (workdaysLoading) return <p>Loading available dates...</p>;

  // Example function to disable unavailable dates
  const isDisabled = (day: Date) => {
    // Format the day to get the day name (e.g., 'Sunday', 'Monday')
    const dayName = format(day, "EEEE");

    // Disable the day if it's not included in the workdays array
    return !workdays.includes(dayName);
  };

  return (
    <div>
      <h2>Select an Available Date</h2>
      <Calendar
        mode="single"
        selected={selectedDate ?? undefined}
        onSelect={setSelectedDate}
        disabled={isDisabled} // Disable unavailable dates
      />
      {selectedDate && (
        <AvailableTimeSlots cleanerId={parseInt(id!)} date={selectedDate} />
      )}
    </div>
  );
}
