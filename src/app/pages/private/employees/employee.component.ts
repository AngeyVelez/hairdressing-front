import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { mergeMap, filter, tap, toArray } from 'rxjs/operators';
import { Employee, EmployeeService } from './_services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  employeeSubscription!: Subscription;
  employees!: Employee[];
  numberOfEntries!: number;
  employeesPerPage!: number
  page!: number
  from!: number
  to!: number

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.page = 1;
    this.employeesPerPage = 5
    this.getEmployees()
  }

  getEmployees() {
    const employees$ = this.employeeService.getEmployees()
    const from = (this.page - 1) * this.employeesPerPage
    const to = this.page * this.employeesPerPage
    this.from = from <= 0 ? 0 : from
    this.to = to > this.numberOfEntries ? this.numberOfEntries : to
    this.employeeSubscription = employees$
      .pipe(
        tap(employees => this.numberOfEntries = employees.length),
        mergeMap(employee => employee),
        filter((_, i) => i >= this.from && i < this.to),
        toArray(),
      )
      .subscribe(employees => {
        this.employees = employees
      })
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(newEmployee => {
      newEmployee && this.employeeService.createEmployee(newEmployee)
        .subscribe((createdEmployees) => {
          createdEmployees.id = 100
          this.employees = [createdEmployees, ...this.employees].slice(0, 5)
        })
    });
  }

  openEditDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '250px',
      data: employee
    });

    dialogRef.afterClosed().subscribe(newEmployee => {
      newEmployee && this.employeeService.updateEmployee(newEmployee, employee.id)
        .subscribe((updatedEmployee) => {
          this.employees = this.employees.map(u => u.id === employee.id? {...u, ...updatedEmployee} : u)
        })
    });
  }

  openDeleteDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: employee
    });

    dialogRef.afterClosed().subscribe(userId => {
      userId && this.removeEmployee(userId)
    });
  }

  removeEmployee(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId)
      .subscribe(() => {
        this.employees = this.employees.filter(e => e.id !== employeeId)
      })
  }

  nextPage() {
    this.page += 1;
    this.getEmployees()
  }

  prevPage() {
    this.page -= 1;
    this.getEmployees()
  }

  ngOnDestroy(): void {
    this.employeeSubscription?.unsubscribe()
  }

}
