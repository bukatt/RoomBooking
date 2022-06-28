import { BookingSlotStatus } from '../Enums/BookingSlotStatus';
import { BookingSlot } from '../Models/BookingSlot';
import * as joda from '@js-joda/core';

export class BookingSlotSerializer{
    fromJson(json: any, user_id: number){
        const bookingSlot: BookingSlot = {
            start_time: joda.LocalTime.parse(json.start_time),
            room_booking_id: json.room_booking_id,
            user: json.user_id,
            status: json.user_id == user_id ? BookingSlotStatus.MyBooking : !json.user_id ? BookingSlotStatus.Available : BookingSlotStatus.Unavailable,
            room_id: json.room_id
        };
        return bookingSlot;
    }
}