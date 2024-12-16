import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { fromEvent } from 'rxjs';
import { FamilyGuest, Guest, GuestService } from '../entities/guest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('scrollbackground') scrollbackground?: ElementRef;
  @ViewChildren('section') sections?: QueryList<ElementRef>;
  private html?: HTMLElement;
  private maxScrollHeight = 0;
  private maxScrollBuffer = 400;
  itineraryTab = 1;
  clickMeClicked = false;
  place = 'eat'

  isGuestAttending = true;
  isGuestNotAttending = false;

  familyLastName = ''

  guestName = '';
  hasPlusOne = false;
  plusOneName = ''

  guestAttendingCeremony = false;
  plusOneAttendingCeremony = false;

  guestAttendingReception = false;
  plusOneAttendingReception = false;

  guestAttendingShow = false;
  plusOneAttendingShow = false;

  families = new Array<FamilyGuest>();
  family = new FamilyGuest();

  constructor(private renderer: Renderer2, private guestService: GuestService) { }

  ngAfterViewInit() {
    if (this.sections) {
      for (const section of this.sections) {
        this.maxScrollHeight += section.nativeElement.clientHeight;
      }
    }

    this.maxScrollHeight += this.maxScrollBuffer + 4000;

    if (this.scrollbackground) {
      const height = this.maxScrollHeight.toString() + 'px';
      this.renderer.setStyle(this.scrollbackground.nativeElement, 'height', height);
    }

    fromEvent(window, 'scroll').subscribe((x) => {
      if (this.sections) {
        let rollingSumOfClientHeights = 0;

        for (let i = 0; i < this.sections.length; ++i) {
          const section = this.sections.get(i)?.nativeElement;

          if (window.scrollY > rollingSumOfClientHeights + this.maxScrollBuffer || i === this.sections?.length - 1 && window.scrollY > rollingSumOfClientHeights) {
            const diff = Math.abs(rollingSumOfClientHeights - window.scrollY);
            this.renderer.setStyle(section, 'transform', `translateY(-${diff / section.clientHeight * 100 * 1.24}vh)`);
          } else {
            this.renderer.setStyle(section, 'transform', `translateY(0vh)`);
          }

          rollingSumOfClientHeights += section.clientHeight;
        }
      }
    });

    this.families = this.guestService.getGuests();
  }

  selectItineraryTab(index: number) {
    this.itineraryTab = index;
    this.clickMeClicked = true;
  }

  onFamilyNameChange() {
    const family = this.families.find(x => x.familyName === this.familyLastName.trim());
    if (family) {
      this.family = family;
      this.family.isAttending = true;
      this.updateCeremonyShow();
    }
  }

  selectPlace(place: string) {
    this.place = place;
  }

  toggleIsGuestAttending() {
    this.isGuestAttending = !this.isGuestAttending;
    this.isGuestNotAttending = !this.isGuestAttending;

    this.family.isAttending = this.isGuestAttending;
  }
  toggleIsGuestAttendingNo() {
    this.isGuestNotAttending = !this.isGuestNotAttending;
    this.isGuestAttending = !this.isGuestNotAttending;

    this.family.isAttending = this.isGuestAttending;
  }

  toggleHasPlusOne() {
    this.hasPlusOne = !this.hasPlusOne;
  }

  updateCeremonyAttendence(guest: Guest) {
    if (guest.IsAdult) {
      this.family.atMaxCeremonyAdult = this.family.guests.filter(x => x.IsAdult && x.AttendingCeremony).length === this.family.maxAdultsToCeremony
    } else {
      this.family.atMaxCeremonyKid = this.family.guests.filter(x => !x.IsAdult && x.AttendingCeremony).length === this.family.maxKidsToCeremony
    }
  }

  updateCeremonyShow() {
    this.family.atMaxShow = this.family.guests.filter(x => x.AttendingShow).length === this.family.maxShowTickets
  }
}


