import { Guest, GuestDTO } from "./guest";

export class FamilyGuest {
    familyGuestId = -1;
    familyName = '';
    isAttending = false;
    comments = '';
    accomodations = '';
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

    arrivalAirlines = '';
    arrivalFlight = '';
    arrivalDate: Date | null = null;

    departureAirlines = '';
    departureFlight = '';
    departureDate: Date | null = null;

    mapFromDTO(familyGuestDto: FamilyGuest | null) {
        if (familyGuestDto) {
            Object.assign(this, familyGuestDto);

            if (familyGuestDto.arrivalDate) {
                this.arrivalDate = new Date(familyGuestDto.arrivalDate);
            }

            if (familyGuestDto.departureDate) {
                this.departureDate = new Date(familyGuestDto.departureDate);
            }

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
    comments = '';
    accomodations = '';

    maxAdults = 0;
    maxKids = 0;

    maxAdultsToCeremony = 0;
    maxKidsToCeremony = 0;
    maxAdultsToReception = 0;
    maxKidsToReception = 0;

    maxShowTickets = 0;
    allowExtraTicket = false;

    arrivalAirlines = '';
    arrivalFlight = '';
    arrivalDate: Date | null = null;

    departureAirlines = '';
    departureFlight = '';
    departureDate: Date | null = null;

    guests = new Array<GuestDTO>();

    constructor(familyGuest: FamilyGuest) {
        if (familyGuest) {
            this.familyGuestId = familyGuest.familyGuestId;
            this.familyName = familyGuest.familyName;
            this.isAttending = familyGuest.isAttending;
            this.comments = familyGuest.comments;
            this.accomodations = familyGuest.accomodations;

            this.arrivalAirlines = familyGuest.arrivalAirlines;
            this.arrivalFlight = familyGuest.arrivalFlight;
            this.arrivalDate = familyGuest.arrivalDate;

            this.departureAirlines = familyGuest.departureAirlines;
            this.departureFlight = familyGuest.departureFlight;
            this.departureDate = familyGuest.departureDate;

            if (familyGuest.guests) {
                this.guests = familyGuest.guests.map(x => new GuestDTO(x));
            }
        }
    }
}