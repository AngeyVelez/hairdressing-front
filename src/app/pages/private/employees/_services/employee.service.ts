import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

export interface Employee {
  id: number,
  name: string,
  username: string,
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
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  WEB_URL = environment.serverUrl

  constructor(private http: HttpClient) { }

  getEmployees () {
    return this.http.get<Employee[]>(`${this.WEB_URL}/users`);
  }

  getEmployee (employeeId: number) {
    return this.http.get<Employee>(`${this.WEB_URL}/users/${employeeId}`);
  }

  createEmployee (employee: Employee) {
    return this.http.post<Employee>(`${this.WEB_URL}/users`, employee);
  }

  updateEmployee (employee: Employee, userId: number) {
    return this.http.put<Employee>(`${this.WEB_URL}/users/${userId}`, employee);
  }

  deleteEmployee (employeeId: number) {
    return this.http.delete<Employee>(`${this.WEB_URL}/users/${employeeId}`);
  }
}
