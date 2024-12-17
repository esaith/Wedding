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
        families.push(this.getTheWeinersParty());
        families.push(this.getDemetrioColonParty());
        families.push(this.getColonParty());
        families.push(this.getRobinsonParty());
        families.push(this.getEstellaParty());
        families.push(this.getCesarColonIIIParty());
        families.push(this.getValeriaTorresParty());
        families.push(this.getRodolfoRabadadParty());
        families.push(this.getTheLopezParty());
        families.push(this.getJeffAndLeahVParty());
        families.push(this.getJeanetteVParty());
        families.push(this.getKipVParty());
        families.push(this.getShannonVParty());
        families.push(this.getAmyVParty());
        families.push(this.getEmilyDParty());
        families.push(this.getKimVParty());
        families.push(this.getCaseyMontanerParty());
        families.push(this.getJomaParty());
        families.push(this.getTheClaytonParty());
        families.push(this.getJoshWilliamsParty());
        families.push(this.getChadrickParty());
        families.push(this.getJustinParty());
        families.push(this.getMaulucciFamily());
        families.push(this.getThangLeParty());
        families.push(this.getTheAlbertsParty());
        families.push(this.getTheJovanniParty());
        families.push(this.getThePeterVacoParty());
        families.push(this.getTheDanielaColonParty());

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

    private getRodolfoRabadadParty() {
        const family = new FamilyGuest();
        family.familyName = "Rodolfo Rabadad";

        family.maxAdults = 1;
        family.maxKids = 0;
        family.maxShowTickets = 0;
        family.allowExtraTicket = true;

        family.maxAdultsToCeremony = 1;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 1;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Rudy"))

        return family;
    }

    private getTheLopezParty() {
        const family = new FamilyGuest();
        family.familyName = "The Lopez's";

        family.maxAdults = 2;
        family.maxKids = 2;
        family.maxShowTickets = 0;
        family.allowExtraTicket = true;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 2;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 2;

        family.guests.push(new Guest("Victor"))
        family.guests.push(new Guest("Cinthia"))
        family.guests.push(new Guest("Ryan", false))
        family.guests.push(new Guest("Sean", false))

        return family;
    }

    private getJeffAndLeahVParty() {
        const family = new FamilyGuest();
        family.familyName = "Jeff & Leah Vanidestine";

        family.maxAdults = 2;
        family.maxKids = 0;
        family.maxShowTickets = 2;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Jeff"))
        family.guests.push(new Guest("Leah"))

        return family;
    }

    private getJeanetteVParty() {
        const family = new FamilyGuest();
        family.familyName = "Jeanette Vanidestine";

        family.maxAdults = 1;
        family.maxKids = 0;
        family.maxShowTickets = 1;

        family.maxAdultsToCeremony = 1;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 1;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Jeanette"))

        return family;
    }

    private getKipVParty() {
        const family = new FamilyGuest();
        family.familyName = "Kip Vanidestine";

        family.maxAdults = 2;
        family.maxKids = 0;
        family.maxShowTickets = 2;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Kip"))

        const guest = new Guest();
        guest.Name = "+1";
        guest.AllowNameModification = true;
        family.guests.push(guest)

        return family;
    }

    private getShannonVParty() {
        const family = new FamilyGuest();
        family.familyName = "Shannon Vanidestine";

        family.maxAdults = 2;
        family.maxKids = 0;
        family.maxShowTickets = 2;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Shannon"))
        family.guests.push(new Guest("Neil"))

        return family;
    }

    private getAmyVParty() {
        const family = new FamilyGuest();
        family.familyName = "Amy Peot";

        family.maxAdults = 1;
        family.maxKids = 0;
        family.maxShowTickets = 1;

        family.maxAdultsToCeremony = 1;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 1;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Amy"))

        return family;
    }

    private getEmilyDParty() {
        const family = new FamilyGuest();
        family.familyName = "Emily Durgin";

        family.maxAdults = 1;
        family.maxKids = 0;
        family.maxShowTickets = 1;

        family.maxAdultsToCeremony = 1;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 1;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Emily"))

        return family;
    }

    private getKimVParty() {
        const family = new FamilyGuest();
        family.familyName = "Kim Vanidestine";

        family.maxAdults = 1;
        family.maxKids = 0;
        family.maxShowTickets = 1;

        family.maxAdultsToCeremony = 1;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 1;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Kim"))

        return family;
    }

    private getCaseyMontanerParty() {
        const family = new FamilyGuest();
        family.familyName = "Casey Montaner";

        family.maxAdults = 2;
        family.maxKids = 0;
        family.maxShowTickets = 1;
        family.allowExtraTicket = true;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Casey"))

        const guest = new Guest();
        guest.Name = "+1";
        guest.AllowNameModification = true;
        family.guests.push(guest);

        return family;
    }

    private getJomaParty() {
        const family = new FamilyGuest();
        family.familyName = "Joma Johnson";

        family.maxAdults = 2;
        family.maxKids = 0;
        family.maxShowTickets = 2;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Joma"))

        const guest = new Guest();
        guest.Name = "+1";
        guest.AllowNameModification = true;
        family.guests.push(guest);

        return family;
    }

    private getTheClaytonParty() {
        const family = new FamilyGuest();
        family.familyName = "The Clayton's";

        family.maxAdults = 3;
        family.maxKids = 2;
        family.maxShowTickets = 2;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 3;
        family.maxKidsToReception = 2;

        family.guests.push(new Guest("Jackie"))
        family.guests.push(new Guest("Ajai"))
        family.guests.push(new Guest("Choly"))
        family.guests.push(new Guest("Anthony", false, true))
        family.guests.push(new Guest("Jaycie", false, true))
        return family;
    }

    private getJoshWilliamsParty() {
        const family = new FamilyGuest();
        family.familyName = "Josh & Donna";

        family.maxAdults = 2;
        family.maxKids = 0;
        family.maxShowTickets = 2;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Josh"))

        const guest = new Guest();
        guest.Name = "Donna";
        guest.AllowNameModification = true;

        family.guests.push(guest);

        return family;
    }

    private getChadrickParty() {
        const family = new FamilyGuest();
        family.familyName = "Chadrick & Lauren";

        family.maxAdults = 2;
        family.maxKids = 0;
        family.maxShowTickets = 2;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Chadrick"))
        family.guests.push(new Guest("Lauren"))

        return family;
    }

    private getJustinParty() {
        const family = new FamilyGuest();
        family.familyName = "Justin & Laura";

        family.maxAdults = 2;
        family.maxKids = 0;
        family.maxShowTickets = 2;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Justin"))
        family.guests.push(new Guest("Laura"))

        return family;
    }

    private getThangLeParty() {
        const family = new FamilyGuest();
        family.familyName = "Thang Le";

        family.maxAdults = 2;
        family.maxKids = 0;
        family.maxShowTickets = 2;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Victor LeThang"))
        family.guests.push(new Guest("Kornelia"))

        return family;
    }

    private getTheAlbertsParty() {
        const family = new FamilyGuest();
        family.familyName = "The Albert's";

        family.maxAdults = 2;
        family.maxKids = 0;
        family.maxShowTickets = 0;
        family.allowExtraTicket = true;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Yvette"))
        family.guests.push(new Guest("Gary"))

        return family;
    }

    private getTheJovanniParty() {
        const family = new FamilyGuest();
        family.familyName = "Jovanni & Janice";

        family.maxAdults = 2;
        family.maxKids = 0;
        family.maxShowTickets = 0;
        family.allowExtraTicket = true;

        family.maxAdultsToCeremony = 2;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 2;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Jovanni"))
        family.guests.push(new Guest("Janice"))

        return family;
    }

    private getThePeterVacoParty() {
        const family = new FamilyGuest();
        family.familyName = "Peter Vaco";

        family.maxAdults = 1;
        family.maxKids = 0;
        family.maxShowTickets = 1;

        family.maxAdultsToCeremony = 1;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 1;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Peter"))

        return family;
    }

    private getTheDanielaColonParty() {
        const family = new FamilyGuest();
        family.familyName = "Daniela Colon";

        family.maxAdults = 1;
        family.maxKids = 0;
        family.maxShowTickets = 1;

        family.maxAdultsToCeremony = 1;
        family.maxKidsToCeremony = 0;

        family.maxAdultsToReception = 1;
        family.maxKidsToReception = 0;

        family.guests.push(new Guest("Daniela"))

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