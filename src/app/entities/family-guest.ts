import { Guest, GuestDTO } from "./guest";

export class FamilyGuest {
    familyGuestId = -1;
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

export class FamilyGuestDTO {
    familyGuestId = -1
    familyName = '';
    isAttending = false;

    maxAdults = 0;
    maxKids = 0;

    maxAdultsToCeremony = 0;
    maxKidsToCeremony = 0;
    maxAdultsToReception = 0;
    maxKidsToReception = 0;

    maxShowTickets = 0;
    allowExtraTicket = false;

    guests = new Array<GuestDTO>();

    constructor(familyGuest: FamilyGuest) {
        if (familyGuest) {
            this.familyGuestId = familyGuest.familyGuestId;
            this.familyName = familyGuest.familyName;
            this.isAttending = familyGuest.isAttending;

            if (familyGuest.guests) {
                this.guests = familyGuest.guests.map(x => new GuestDTO(x));
            }
        }
    }
}