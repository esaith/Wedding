export class Guest {
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