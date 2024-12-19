import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, lastValueFrom } from 'rxjs';
import { FamilyGuest } from '../entities/family-guest';
import { Guest } from '../entities/guest';
import { GuestService } from '../entities/guest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('scrollbackground') scrollbackground?: ElementRef;
  sections?: Array<Element>;
  private maxScrollHeight = 0;
  private maxScrollBuffer = 200;
  itineraryTab = 1;
  clickMeClicked = false;
  place = 'eat'

  isGuestAttending = true;
  isGuestNotAttending = false;

  familyLastName = '';

  plusOneAttendingShow = false;

  families = new Array<FamilyGuest>();
  family: FamilyGuest | null | undefined;
  submissionComplete = false;
  isSearchForFamilyName = false;
  familySearchError = '';

  constructor(private renderer: Renderer2, private guestService: GuestService) { }

  ngAfterViewInit() {
    this.maxScrollHeight = 0;

    this.calculatePageHeight();


    fromEvent(window, 'scroll')
      .subscribe((x) => {
        if (this.sections) {
          let rollingSumOfClientHeights = 0;

          for (let i = 0; i < this.sections.length; ++i) {
            const section = this.sections[i];

            if (window.scrollY > rollingSumOfClientHeights + this.maxScrollBuffer * i + section.clientHeight) {
              this.renderer.setStyle(section, 'transform', `translateY(-200vh)`);
            } else if (i == 0
              || window.scrollY > rollingSumOfClientHeights + this.maxScrollBuffer * i
              || i === this.sections?.length - 1 && window.scrollY > rollingSumOfClientHeights
            ) {

              let diff = Math.abs(rollingSumOfClientHeights - window.scrollY);
              if (i !== 0) {
                diff -= (this.maxScrollBuffer * i);
              }

              this.renderer.setStyle(section, 'transform', `translateY(-${diff / section.clientHeight * 100}%)`);
            } else {
              this.renderer.setStyle(section, 'transform', `translateY(0vh)`);
            }

            rollingSumOfClientHeights += section.clientHeight;
          }
        }
      });
  }

  calculatePageHeight() {
    setTimeout(() => {
      this.maxScrollHeight = 0;
      this.sections = Array.from(document.querySelectorAll('.section'));

      for (const section of this.sections) {
        this.maxScrollHeight += section.clientHeight;
      }

      this.maxScrollHeight += this.maxScrollBuffer * (this.sections.length);

      if (this.scrollbackground) {
        const height = this.maxScrollHeight.toString() + 'px';
        this.renderer.setStyle(this.scrollbackground.nativeElement, 'height', height);
      }
    }, 500);
  }

  selectItineraryTab(index: number) {
    this.itineraryTab = index;
    this.clickMeClicked = true;
  }

  async searchByName() {
    this.isSearchForFamilyName = true;
    try {
      const family = await lastValueFrom(this.guestService.getGuestByName(this.familyLastName));

      if (family) {
        this.family = family;
        this.familySearchError = "";
        this.isSearchForFamilyName = false;

        if (this.family.isAttending) {
          this.isGuestAttending = true;
          this.isGuestNotAttending = false;
        } else {
          this.isGuestAttending = false;
          this.isGuestNotAttending = true;
        }

        this.updateCeremonyShow();
        this.calculatePageHeight();
      } else {
        this.familySearchError = "Unable to find family. Please check the family name on the postal envelope."
      }
    } catch (error) {
      this.isSearchForFamilyName = false;
      this.familySearchError = "Issue contacting the server. Please try again later or give us a call so we can fix it!";
    }
  }

  selectPlace(place: string) {
    this.place = place;
  }

  toggleIsGuestAttending() {
    if (!this.family)
      return;

    this.isGuestAttending = !this.isGuestAttending;
    this.isGuestNotAttending = !this.isGuestAttending;

    this.family.isAttending = this.isGuestAttending;
    if (this.family.isAttending) {
      this.calculatePageHeight();
    }
  }
  toggleIsGuestAttendingNo() {
    if (!this.family)
      return;

    this.isGuestNotAttending = !this.isGuestNotAttending;
    this.isGuestAttending = !this.isGuestNotAttending;

    this.family.isAttending = this.isGuestAttending;

    if (this.family.isAttending) {
      this.calculatePageHeight();
    }
  }

  updateCeremonyAttendence(guest: Guest) {
    if (!this.family)
      return;

    if (guest.isAdult) {
      this.family.atMaxCeremonyAdult = this.family.guests.filter(x => x.isAdult && x.attendingCeremony).length === this.family.maxAdultsToCeremony;
    } else {
      this.family.atMaxCeremonyKid = this.family.guests.filter(x => !x.isAdult && x.attendingCeremony).length === this.family.maxKidsToCeremony;
    }
  }

  updateCeremonyShow() {
    if (!this.family)
      return;

    this.family.atMaxShow = this.family.guests.filter(x => x.attendingShow).length === this.family.maxShowTickets
  }

  async submitRsvp() {
    if (this.family) {
      this.submissionComplete = false;
      await lastValueFrom(this.guestService.submit(this.family));
      this.submissionComplete = true;
    }
  }
}