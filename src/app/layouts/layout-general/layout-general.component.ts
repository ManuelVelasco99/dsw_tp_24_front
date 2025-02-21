import { Component, ViewChild        } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router'
import { DeviceService } from '../../core/services/device-service.service';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';





@Component({
	selector: 'app-layout-general',
	standalone: true,
	imports: [MatButtonModule,MatIconModule,MatToolbarModule, RouterLink, MatSidenavModule],
	templateUrl: './layout-general.component.html',
	styleUrl: './layout-general.component.scss'
})
export class LayoutGeneralComponent {

	@ViewChild('sidenav') sidenav!: MatSidenav;

	constructor(public deviceService: DeviceService) {

	}

	public toggleSidenav() {
		this.sidenav.toggle();
	}

}
