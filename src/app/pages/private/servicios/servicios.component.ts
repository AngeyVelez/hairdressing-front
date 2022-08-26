import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { mergeMap, filter, tap, toArray } from 'rxjs/operators';
import { Services, ServicesService } from './_services/servicios.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-services',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {

  serviciosubscription!: Subscription;
  servicios!: Services[];
  numberOfEntries!: number;
  servicesPerPage!: number
  page!: number
  from!: number
  to!: number

  constructor(
    private ServicesService: ServicesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.page = 1;
    this.servicesPerPage = 5
    this.getservices()
  }

  getservices() {
    const services$ = this.ServicesService.getServices()
    const from = (this.page - 1) * this.servicesPerPage
    const to = this.page * this.servicesPerPage
    this.from = from <= 0 ? 0 : from
    this.to = to > this.numberOfEntries ? this.numberOfEntries : to
    this.serviciosubscription = services$
      .pipe(
        tap(services => this.numberOfEntries = services.length),
        mergeMap(services => services),
        filter((_, i) => i >= this.from && i < this.to),
        toArray(),
      )
      .subscribe(services => {
        this.servicios = services
      })
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(newservices => {
      newservices && this.ServicesService.createService(newservices)
        .subscribe((createdservices) => {
          createdservices.id = 100
          this.servicios = [createdservices, ...this.servicios].slice(0, 5)
        })
    });
  }

  openEditDialog(services:Services): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '250px',
      data: services
    });

    dialogRef.afterClosed().subscribe(newservices => {
      newservices && this.ServicesService.updateService(newservices, services.id)
        .subscribe((updatedservices) => {
          this.servicios = this.servicios.map(u => u.id === services.id? {...u, ...updatedservices} : u)
        })
    });
  }

  openDeleteDialog(services: Services): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: services
    });

    dialogRef.afterClosed().subscribe(servicesId => {
      servicesId && this.removeservices(servicesId)
    });
  }

  removeservices(servicesId: number) {
    this.ServicesService.deleteService(servicesId)
      .subscribe(() => {
        this.servicios = this.servicios.filter(u => u.id !== servicesId)
      })
  }

  nextPage() {
    this.page += 1;
    this.getservices()
  }

  prevPage() {
    this.page -= 1;
    this.getservices()
  }

  ngOnDestroy(): void {
    this.serviciosubscription?.unsubscribe()
  }
  
}
