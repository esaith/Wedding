export class Guest {
    guestId = -1
    name = '';
    attendingCeremony = false;
    attendingReception = false;
    attendingShow = false;
    attendingShowExtraTicket = false;
    isAdult = true;
    isUnderFive = false;
    allowNameModification = false;

    constructor(name = "", isAdult = true, isUnderFive = false) {
        if (name) {
            this.name = name;
        }

        this.isAdult = isAdult
        this.isUnderFive = isUnderFive;
    }

    mapFromDTO(guest: Guest | null) {
        if (guest) {
            Object.assign(this, guest);
        }
    }
}

export class GuestDTO {
    guestId = -1;
    name = '';
    attendingCeremony = false;
    attendingReception = false;
    attendingShow = false;
    attendingShowExtraTicket = false;
    isAdult = true;
    isUnderFive = false;
    allowNameModification = false;

    constructor(guest: Guest) {
        if (guest) {
            this.guestId = guest.guestId;
            this.name = guest.name;
            this.attendingCeremony = guest.attendingCeremony;
            this.attendingReception = guest.attendingReception;
            this.attendingShow = guest.attendingShow;
            this.attendingShowExtraTicket = guest.attendingShowExtraTicket;
        }
    }
}