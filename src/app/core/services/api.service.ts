import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  	providedIn: 'root'
})
export class ApiService {

	private axiosInstance: AxiosInstance;

	constructor() {
		// Crear una instancia de Axios (se puede configurar la base URL aquí si es necesario)
		this.axiosInstance = axios.create({
		baseURL: 'http://localhost:3000', // Reemplaza con la URL de tu API
		headers: {
			'Content-Type': 'application/json'
		}
		});
	}

	// Método GET asíncrono
	async get(uri: string): Promise<any> {
		try {
		const response = await this.axiosInstance.get(uri);
		return response.data.data;
		} catch (error) {
		console.error('Error en GET', error);
		throw error;
		}
	}

	// Método POST asíncrono
	async post(uri: string, body: any): Promise<any> {
		try {
		const response = await this.axiosInstance.post(uri, body);
		return response.data;
		} catch (error) {
		console.error('Error en POST', error);
		throw error;
		}
	}
}
