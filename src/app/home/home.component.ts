import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { fromEvent, lastValueFrom } from 'rxjs';
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
  families = new Array<FamilyGuest>();
  family = new FamilyGuest();
  submissionComplete = false;
  isSearchForFamilyName = false;
  familySearchError = '';
  whereIsThisIsOpen = false;

  constructor(private renderer: Renderer2, private guestService: GuestService) {
    this.startServer();
  }

  startServer() {
    try {
      this.guestService.getGuestByName("a").subscribe();
    } catch (e) { }
  }

  ngAfterViewInit() {
    this.calculatePageHeight();
    fromEvent(window, 'scroll').subscribe((x) => this.scroll(window.scrollY));
  }

  scroll(scrollY: number) {
    if (this.sections) {
      let rollingSumOfClientHeights = 0;

      for (let i = 0; i < this.sections.length; ++i) {
        const section = this.sections[i];

        if (scrollY > rollingSumOfClientHeights + this.maxScrollBuffer + section.clientHeight + 800) {
          this.renderer.setStyle(section, 'transform', `translateY(-1000vh)`);
        } else if (i == 0
          || scrollY > rollingSumOfClientHeights + this.maxScrollBuffer * i
          || i === this.sections?.length - 1 && scrollY > rollingSumOfClientHeights
        ) {

          let diff = Math.abs(rollingSumOfClientHeights - scrollY);
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
  }

  viewOnMap(place: string) {
    switch (place) {
      case 'WynnHotel':
        window.open('https://www.google.com/maps/dir//The+Wedding+Salons+at+Wynn+Las+Vegas,+3131+S+Las+Vegas+Blvd,+Las+Vegas,+NV+89109/@36.1255085,-115.1676305,18z/data=!3m1!5s0x80c8c46a63457f99:0x39f304ea80cf1f10!4m17!1m7!3m6!1s0x80c8c2cc6478404b:0xa56d3c9469c46f2c!2sThe+Wedding+Salons+at+Wynn+Las+Vegas!8m2!3d36.12577!4d-115.1657002!16s%2Fg%2F113hdx836!4m8!1m0!1m5!1m1!1s0x80c8c2cc6478404b:0xa56d3c9469c46f2c!2m2!1d-115.1657002!2d36.12577!3e2?entry=ttu&amp;g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D')
        break;
      case 'MonAmi':
        window.open('https://www.google.com/maps/dir/The+Wedding+Salons+at+Wynn+Las+Vegas,+South+Las+Vegas+Boulevard,+Las+Vegas,+NV/3655+S+Las+Vegas+Blvd+South,+Las+Vegas,+NV+89109/@36.1174777,-115.1798365,15z/data=!3m2!4b1!5s0x80c8c43094c4819d:0x498c25bd56550acb!4m13!4m12!1m5!1m1!1s0x80c8c2cc6478404b:0xa56d3c9469c46f2c!2m2!1d-115.1657002!2d36.12577!1m5!1m1!1s0x80c8c4375b2e62dd:0xc249a313f7e029dc!2m2!1d-115.1724846!2d36.1128631?entry=ttu&amp;g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D')
        break;
      case 'show':
        window.open('https://www.google.com/maps/dir/Mon+Ami+Gabi,+South+Las+Vegas+Boulevard,+Las+Vegas,+NV/K%C3%80+by+Cirque+du+Soleil,+MGM+Grand,+South+Las+Vegas+Boulevard,+Las+Vegas,+NV/@36.1082845,-115.1764577,16z/data=!3m2!4b1!5s0x80c8c5cc93820bd3:0x6c1168e3473cbd5b!4m13!4m12!1m5!1m1!1s0x80c8c4375b2e62dd:0xc249a313f7e029dc!2m2!1d-115.1724846!2d36.1128631!1m5!1m1!1s0x80c8c433370be08d:0x487d2ebb69e733c5!2m2!1d-115.1701311!2d36.1030917?entry=ttu&amp;g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D')
        break;
    }
  }

  goToMapByLatLong(lat: number, long: number) {
    // If it's an iPhone..
    if ((navigator.platform.indexOf("iPhone") != -1)
      || (navigator.platform.indexOf("iPod") != -1)
      || (navigator.platform.indexOf("iPad") != -1))
      window.open(`maps://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${lat},${long}`);
    else
      window.open(`https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${lat},${long}`);
  }

  goToPage(index: number) {
    let scroll = 0;

    if (this.sections) {
      for (let i = 0; i < index; ++i) {
        scroll += this.sections[i].clientHeight + this.maxScrollBuffer * i;
        if (i >= 3) {
          scroll -= (150 * i);
        }
      }
    }

    window.scrollTo(0, scroll);
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

  openWhereIsThis() {
    this.whereIsThisIsOpen = true;
  }

  closewhereIsThis() {
    this.whereIsThisIsOpen = false;
  }

  async searchByName() {
    this.isSearchForFamilyName = true;
    this.submissionComplete = false;

    try {
      const family = await lastValueFrom(this.guestService.getGuestByName(this.familyLastName));

      if (family && family.familyName) {
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
        this.familySearchError = `Unable to find the reservation. Click
         "Where is this?" to see an example of where to find the addressee's name.`;
        this.isSearchForFamilyName = false;
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

  updateFamilyComment(event: any) {
    if (this.family && event.target) {
      this.family.comments = event.target.value;
    }
  }

  async submitRsvp() {
    if (this.family) {
      this.submissionComplete = false;
      await lastValueFrom(this.guestService.submit(this.family));
      this.submissionComplete = true;
    }
  }
}