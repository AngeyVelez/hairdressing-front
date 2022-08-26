import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

export interface Services {
  id: number,
  name: string,
  description: string,
  email: string,
  address?: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: number,
      lng: number
    }
  },
  phone: string,
  website?: string,
  company?: {
    name: string,
    catchPhrase: string,
    bs: string
  },
  stylist: string,
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  WEB_URL = environment.serverUrl

  constructor(private http: HttpClient) { }

  getServices () {
    return this.http.get<Services[]>(`${this.WEB_URL}/Services`);
  }

  getService (ServiceId: number) {
    return this.http.get<Services>(`${this.WEB_URL}/Services/${ServiceId}`);
  }

  createService (Service: Services) {
    return this.http.post<Services>(`${this.WEB_URL}/Services`, Service);
  }

  updateService (Service: Services, ServiceId: number) {
    return this.http.put<Services>(`${this.WEB_URL}/Services/${ServiceId}`, Service);
  }

  deleteService (ServiceId: number) {
    return this.http.delete<Services>(`${this.WEB_URL}/Services/${ServiceId}`);
  }
}
