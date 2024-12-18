import { Injectable } from "@angular/core";
import { FamilyGuest, FamilyGuestDTO } from "./family-guest";
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GuestService {
    private baseApi = 'https://localhost:7185/api'
    guests = Array<FamilyGuest>();

    constructor(private http: HttpClient) { }

    getGuestByName(name: string): Observable<FamilyGuest> {
        return this.http.get(`${this.baseApi}/family/GetFamilyByName/${name}`).pipe(
            switchMap(x => {
                const familyGuest = new FamilyGuest();
                familyGuest.mapFromDTO(x as FamilyGuest);
                return of(familyGuest);
            })
        );
    }

    submit(familyGuest: FamilyGuest): Observable<FamilyGuest> {
        const dto = new FamilyGuestDTO(familyGuest);
        return this.http.put<FamilyGuest>(`${this.baseApi}/family/submit`, dto);
    }
}