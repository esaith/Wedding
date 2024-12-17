import { Guest } from "./guest";

export class FamilyGuest {
    familyName = '';
    isAttending = false;
    guests = new Array<Guest>();

    maxAdults = 0;
    maxKids = 0;

    maxAdultsToCeremony = 0;
    maxKidsToCeremony = 0;
    maxAdultsToReception = 0;
    maxKidsToReception = 0;

    maxShowTickets = 0;
    allowExtraTicket = false;

    atMaxCeremonyAdult = false;
    atMaxCeremonyKid = false;
    atMaxShow = false;

    mapFromDTO(familyGuestDto: FamilyGuest | null) {
        if (familyGuestDto) {
            Object.assign(this, familyGuestDto);

            if (familyGuestDto.guests) {
                this.guests = familyGuestDto.guests.map(g => {
                    const guest = new Guest();
                    guest.mapFromDTO(g);
                    return guest;
                });
            }
        }
    }
}