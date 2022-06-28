import * as joda from '@js-joda/core';
import { BookingSlotStatus } from '../Enums/BookingSlotStatus';

export interface BookingSlot{
    start_time: joda.LocalTime
    user: number | null
    status: BookingSlotStatus
    room_booking_id: number
    room_id: number
}