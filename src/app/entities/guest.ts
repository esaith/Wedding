import { Injectable } from "@angular/core";

export class Guest {
    Name = '';
    AttendingCeremony = false;
    AttendingReception = false;
    AttendingShow = false;
    AttendingShowExtraTicket = false;
    IsAdult = true;
    IsUnderFive = false;
    AllowNameModification = false;

    constructor(name = "", isAdult = true, isUnderFive = false) {
        if (name) {
            this.Name = name;
        }

        this.IsAdult = isAdult
        this.IsUnderFive = isUnderFive;
    }
}

export class FamilyGuest {
    familyName = '';
    isAttending = false;

    maxAdults = 0;
    maxKids = 0;

    guests = new Array<Guest>();

    maxAdultsToCeremony = 0;
    maxKidsToCeremony = 0;
    maxAdultsToReception = 0;
    maxKidsToReception = 0;

    maxShowTickets = 0;
    allowExtraTicket = false;

    atMaxCeremonyAdult = false;
    atMaxCeremonyKid = false;

    atMaxShow = false;
}

@Injectable({ providedIn: 'root' })
export class GuestService {
    guests = Array<FamilyGuest>();

    getGuests() {
        const families = new Array<FamilyGuest>();
        families.push(this.getSharonLopezParty());
        families.push(this.getRosaRaymondParty());
        families.push(this.getBonnieLopezParty());
        families.push(this.getMaulucciFamily());
        families.push(this.getTheWeinersParty());
        families.push(this.getDemetrioColonParty());
        families.push(this.getColonParty());
        families.push(this.getRobinsonParty());
        families.push(this.getEstellaParty());
        families.push(this.getCesarColonIIIParty());
        families.push(this.getValeriaTorresParty());
        return families;
    }

    private getSharonLopezParty() {
        const family = new FamilyGuest();
        family.familyName = "Sharon Lopez";

        family.maxAdults = 2;
        family.maxKids = 0;
        family.maxShowTickets = 2;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Sharon"))
        family.guests.push(new Guest("Jim"))
        return family;
    }

    private getRosaRaymondParty() {
        const family = new FamilyGuest();
        family.familyName = "Rosa Raymond";

        family.maxAdults = 1;
        family.maxKids = 0;
        family.maxShowTickets = 1;

        family.maxAdultsToCeremony = 1;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 1;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Rosa"))
        return family;
    }

    private getBonnieLopezParty() {
        const family = new FamilyGuest();
        family.familyName = "Bonnie Lopez";

        family.maxAdults = 1;
        family.maxKids = 0;
        family.maxShowTickets = 1;

        family.maxAdultsToCeremony = 1;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 1;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Bonnie"))
        return family;
    }

    private getTheWeinersParty() {
        const family = new FamilyGuest();
        family.familyName = "The Weiner's";

        family.maxAdults = 2;
        family.maxKids = 0;
        family.maxShowTickets = 2;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Luisa"))
        family.guests.push(new Guest("David"))
        return family;
    }

    private getDemetrioColonParty() {
        const family = new FamilyGuest();
        family.familyName = "Demetrio Colon";

        family.maxAdults = 1;
        family.maxKids = 0;
        family.maxShowTickets = 1;

        family.maxAdultsToCeremony = 1;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 1;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Pepe"))
        return family;
    }

    private getColonParty() {
        const family = new FamilyGuest();
        family.familyName = "The Colon's";

        family.maxAdults = 2;
        family.maxKids = 0;
        family.maxShowTickets = 2;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Abby"))
        family.guests.push(new Guest("Cesar"))
        return family;
    }

    private getRobinsonParty() {
        const family = new FamilyGuest();
        family.familyName = "The Robinson's";

        family.maxAdults = 2;
        family.maxKids = 2;
        family.maxShowTickets = 1;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 2;
        family.allowExtraTicket = true;

        family.guests.push(new Guest("Anastacia"))
        family.guests.push(new Guest("Bernell"))
        family.guests.push(new Guest("Esmeralda", false, true))
        family.guests.push(new Guest("Luca", false, true))
        return family;
    }

    private getEstellaParty() {
        const family = new FamilyGuest();
        family.familyName = "The Estrella's";

        family.maxAdults = 2;
        family.maxKids = 2;
        family.maxShowTickets = 1;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 2;
        family.allowExtraTicket = true;

        family.guests.push(new Guest("Bianca"))
        family.guests.push(new Guest("Andrew"))
        family.guests.push(new Guest("Jakobi", false, true))
        family.guests.push(new Guest("Jaryana", false, true))
        return family;
    }

    private getCesarColonIIIParty() {
        const family = new FamilyGuest();
        family.familyName = "Cesar Colon III";

        family.maxAdults = 2;
        family.maxKids = 0;
        family.maxShowTickets = 0;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 0;
        family.allowExtraTicket = true;

        family.guests.push(new Guest("Cesar"))
        family.guests.push(new Guest("Gabby"))
        return family;
    }

    private getValeriaTorresParty() {
        const family = new FamilyGuest();
        family.familyName = "Valeria Torres";

        family.maxAdults = 2;
        family.maxKids = 0;
        family.maxShowTickets = 2;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Valeria"))

        const guest = new Guest("+1");
        guest.AllowNameModification = true;
        family.guests.push(guest)
        return family;
    }

    private getMaulucciFamily() {
        const family = new FamilyGuest();
        family.familyName = "Maulucci";

        family.maxAdults = 3;
        family.maxKids = 2;
        family.maxShowTickets = 2;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 1;

        family.maxAdultsToReception = 3;
        family.maxKidsToReception = 2;

        family.guests.push(new Guest("Kevin"))
        family.guests.push(new Guest("Laura"))
        family.guests.push(new Guest("Abuela"))
        family.guests.push(new Guest("Taylor", false))
        family.guests.push(new Guest("Kid 2", false, true))
        return family;
    }
}