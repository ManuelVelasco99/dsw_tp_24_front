import { ApiService   			} from '../../core/services/api.service';
import { Component, Inject 				} from '@angular/core';
import { LayoutGeneralComponent } from '../../layouts/layout-general/layout-general.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef        } from '@angular/material/dialog';
import { MatPaginator 			} from '@angular/material/paginator';
import { MatPaginatorModule	  	} from '@angular/material/paginator';
import { MatTableDataSource	  	} from '@angular/material/table';
import { MatTableModule		    } from '@angular/material/table';
import { ViewChild    			} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';



export interface Especialidad {
	id: number;
	nombre: string;
	estado: string;
}

@Component({
	selector: 'app-especialidades',
	standalone: true,
	imports: [MatTableModule, MatPaginatorModule,LayoutGeneralComponent],
	templateUrl: './especialidades.component.html',
	styleUrl: './especialidades.component.scss'
})
export class EspecialidadesComponent {

	constructor(private apiService: ApiService, public dialog: MatDialog) {}
  
	public especialidades: Especialidad[] = []; // Especifica el tipo aquí
	public dataSource: MatTableDataSource<Especialidad> = new MatTableDataSource(); // Usa el tipo correcto
  
	async loadEspecialidades() {
		try {
			this.especialidades = await this.apiService.get('/especialidades');
			this.dataSource.data = this.especialidades;
			this.dataSource.paginator = this.paginator;
		} catch (error) {
			console.error('Error en las peticiones', error);
		}
	}

	async ngOnInit() {
	  try {
		// Llamar al método GET
		this.especialidades = await this.apiService.get('/especialidades');
		console.log('GET this.establecimientos:', this.especialidades);
  
		// Asignar los datos al dataSource
		this.dataSource = new MatTableDataSource(this.especialidades);

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

	openDialog(especialidad?: Especialidad): void {
		const dialogRef = this.dialog.open(DialogContentExampleDialog, {
			width: '300px',
			data: especialidad ? { ...especialidad } : { id: null, nombre: '', estado: '' }
		});

		dialogRef.afterClosed().subscribe(async (result : any) => {
			console.log(result);
			if (result) {
				console.log(especialidad)
				let response = await this.apiService.post('/especialidades', {"nombre":result.nombre})
				console.log(response)
			}
			//if (result) {
			//	// Aquí puedes manejar los datos ingresados, como agregar o actualizar `especialidades`
			//	if (especialidad) {
			//		// Editar especialidad existente
			//		const index = this.especialidades.findIndex(e => e.id === result.id);
			//		if (index > -1) this.especialidades[index] = result;
			//	} else {
			//		// Agregar nueva especialidad
			//		this.especialidades.push(result);
			//	}
			//	this.dataSource.data = this.especialidades;
			//}
		});
	}

}

// Dialog para el formulario de alta/edición
@Component({
	selector: 'dialog-content-example-dialog',
	standalone: true,
	imports:[MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule],
	template: `
		<h2 mat-dialog-title>{{ data.id ? 'Editar Especialidad' : 'Agregar Especialidad' }}</h2>
		<div mat-dialog-content>
			<form [formGroup]="form">
				<mat-form-field>
					<mat-label>Nombre</mat-label>
					<input matInput formControlName="nombre">
				</mat-form-field>
				<mat-form-field>
					<mat-label>Estado</mat-label>
					<mat-select formControlName="estado">
						<mat-option value="1">Habilitado</mat-option>
						<mat-option value="0">Deshabilitado</mat-option>
					</mat-select>
				</mat-form-field>
			</form>
		</div>
		<div mat-dialog-actions>
			<button mat-button (click)="onNoClick()">Cancelar</button>
			<button mat-button (click)="save()" [disabled]="form.invalid">Guardar</button>
		</div>
	`,
})
export class DialogContentExampleDialog {
	form: FormGroup;

	constructor(
		public dialogRef: MatDialogRef<DialogContentExampleDialog>,
		@Inject(MAT_DIALOG_DATA) public data: Especialidad,
		private fb: FormBuilder
	) {
		this.form = this.fb.group({
			id: [data.id],
			nombre: [data.nombre, Validators.required],
			estado: [data.estado, Validators.required,]
		});
		this.form.get('estado')?.setValue('1');
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	save(): void {
		if (this.form.valid) {
			console.log(this.form.value)
			this.dialogRef.close(this.form.value);
		}
	}
}