import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { City, Country } from '../types';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  async getCountries(): Promise<Country[]> {
    const response = await fetch('https://localhost:7086/countries', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  }

  async getCities(country: string): Promise<City[]> {
    const response = await fetch(
      `http://api.geonames.org/searchJSON?country=${country}&username=gradgo`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(await response.json());
    return [];
  }
}
