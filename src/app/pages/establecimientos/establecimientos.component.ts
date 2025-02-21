import { ApiService   			} from '../../core/services/api.service';
import { Component 				} from '@angular/core';
import { LayoutGeneralComponent } from '../../layouts/layout-general/layout-general.component';
import { MatPaginator 			} from '@angular/material/paginator';
import { MatPaginatorModule		} from '@angular/material/paginator';
import { MatTableDataSource		} from '@angular/material/table';
import { MatTableModule			} from '@angular/material/table';
import { OnInit   				} from '@angular/core';
import { ViewChild    			} from '@angular/core';

export interface Establecimiento {
	id: number;
	nombre: string;
	estado: string;
}

@Component({
	selector: 'app-establecimientos',
	standalone: true,
	imports: [MatTableModule, MatPaginatorModule,LayoutGeneralComponent],
	templateUrl: './establecimientos.component.html',
	styleUrl: './establecimientos.component.scss'
})
export class EstablecimientosComponent implements OnInit {

	constructor(private apiService: ApiService) {}
  
	public establecimientos: Establecimiento[] = []; // Especifica el tipo aquí
	public dataSource: MatTableDataSource<Establecimiento> = new MatTableDataSource(); // Usa el tipo correcto
  
	async ngOnInit() {
	  try {
		// Llamar al método GET
		this.establecimientos = await this.apiService.get('/establecimientos');
		console.log('GET this.establecimientos:', this.establecimientos);
  
		// Asignar los datos al dataSource
		this.dataSource = new MatTableDataSource(this.establecimientos);

		this.dataSource.paginator = this.paginator;
		
		// Llamar al método POST (si es necesario)
		// const requestBody = { key: 'value' };
		// const postResponse = await this.apiService.post<any>('/data', requestBody);
		// console.log('POST Response:', postResponse);
  
	  } catch (error) {
		console.error('Error en las peticiones', error);
	  }
	}
  
	displayedColumns: string[] = ['id', 'nombre', 'estado'];
  
	@ViewChild(MatPaginator) paginator!: MatPaginator;
  
}
