import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  	providedIn: 'root'
})
export class DeviceService {
	private mobileWidth = 1024;
	private isMobileSubject = new BehaviorSubject<boolean>(this.checkIfMobile());

	constructor() {
		this.updateDeviceStatus();
	}

	// Método sincrónico para obtener el valor actual de isMobile
	get isMobile(): boolean {
		return this.isMobileSubject.value;
	}

	// Método para verificar si el dispositivo es móvil
	private checkIfMobile(): boolean {
		return window.innerWidth <= this.mobileWidth;
	}

	// Escucha el cambio de tamaño de la ventana para actualizar el estado
	private updateDeviceStatus() {
		window.addEventListener('resize', () => {
		this.isMobileSubject.next(this.checkIfMobile());
		});
	}
}
