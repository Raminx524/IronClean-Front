import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchReservations } from "./ReservationsCalendar";

export interface IReservation {
  Start_time: string;
  End_time: string;
}

function calculateAvailableTimeSlots(reservations: IReservation[]) {
  const allSlots = generateTimeSlots("08:00", "20:00", 60); // Generates hourly slots between 8 AM and 8 PM
  const reservedSlots = reservations.map((r) => ({
    start: r.Start_time,
    end: r.End_time,
  }));

  // Filter out reserved slots
  return allSlots.filter((slot) => !isOverlapping(slot, reservedSlots));
}

function generateTimeSlots(
  start: string,
  end: string,
  interval: number
): string[] {
  const startTime = parseTime(start); // Convert "08:00" to minutes since midnight
  const endTime = parseTime(end); // Convert "20:00" to minutes since midnight
  const slots: string[] = [];

  for (
    let currentTime = startTime;
    currentTime + interval <= endTime;
    currentTime += interval
  ) {
    const slotStart = formatTime(currentTime); // Convert minutes since midnight back to "HH:mm"
    const slotEnd = formatTime(currentTime + interval); // End time of the current slot
    slots.push(`${slotStart} - ${slotEnd}`);
  }

  return slots;
}

// Helper function to convert "HH:mm" to minutes since midnight
function parseTime(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// Helper function to convert minutes since midnight back to "HH:mm"
function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

function isOverlapping(
  slot: string,
  reservedSlots: { start: string; end: string }[]
): boolean {
  const [slotStart, slotEnd] = slot.split(" - ").map(parseTime);

  for (const reserved of reservedSlots) {
    const reservedStart = parseTime(reserved.start);
    const reservedEnd = parseTime(reserved.end);

    // Check if the current slot overlaps with the reserved slot
    if (slotStart < reservedEnd && slotEnd > reservedStart) {
      return true;
    }
  }

  return false;
}

export function AvailableTimeSlots({
  cleanerId,
  date,
}: {
  cleanerId: number;
  date: Date;
}) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const { data: reservations, isLoading: reservationsLoading } = useQuery({
    queryKey: [`cleaner${cleanerId}-reservations`, date],
    queryFn: () =>
      fetchReservations(cleanerId, date.toISOString().split("T")[0]),
  });

  if (reservationsLoading) return <p>Loading available time slots...</p>;

  const availableTimeSlots = calculateAvailableTimeSlots(reservations);

  return (
    <div>
      <h3>Select an Available Time</h3>
      {availableTimeSlots.map((time) => (
        <button key={time} onClick={() => setSelectedTime(time)}>
          {time}
        </button>
      ))}
      {/* {selectedTime && (
        <button onClick={() => bookAppointment(cleanerId, date, selectedTime)}>
          Confirm Appointment
        </button>
      )} */}
    </div>
  );
}
