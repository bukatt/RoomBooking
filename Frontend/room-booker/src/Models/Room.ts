import { BookingSlot } from "./BookingSlot";
import { Company } from "./Company";

export interface Room {
    room_id: number;
    name: string;
    company: Company;
    room_bookings: BookingSlot[];
}