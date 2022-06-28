import { BookingSlot } from '../Models/BookingSlot';
import {Room} from '../Models/Room';
import { BookingSlotSerializer } from './BookingSlotSerializer';
import { CompanySerializer } from './CompanySerializer';

export class RoomSerializer{
    fromJson(json: any, user_id: number){
        const companySerializer: CompanySerializer = new CompanySerializer()
        const bookingSlotSerializer: BookingSlotSerializer = new BookingSlotSerializer()
        
        const room: Room = {
            name: json.name,
            room_id: json.room_id,
            company: companySerializer.fromJson(json.company),
            room_bookings: json.room_bookings
                            .map((booking: any) => bookingSlotSerializer.fromJson(booking, user_id))
                            .sort((a: BookingSlot, b: BookingSlot) => b.start_time.isAfter(a.start_time) ? -1 : 1)
        };

        return room;
    }
}