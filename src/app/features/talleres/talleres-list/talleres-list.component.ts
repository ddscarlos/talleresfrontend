import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TalleresService } from '../../../services/talleres.service';

@Component({
  selector: 'app-talleres-list',
  templateUrl: './talleres-list.component.html',
  styleUrls: ['./talleres-list.component.css']
})
export class TalleresListComponent implements OnInit {
  talleres: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private talleresService: TalleresService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTalleres();
  }

  loadTalleres(): void {
    this.loading = true;
    this.talleresService.getTalleres().subscribe(
      data => {
        this.talleres = data;
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Error al cargar los talleres';
        this.loading = false;
      }
    );
  }

  verDetalle(id: number): void {
    this.router.navigate(['/talleres', id]);
  }
}
