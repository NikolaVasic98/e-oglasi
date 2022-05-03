import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public async fetchPost<T>(url: string, data: any, options?: any): Promise<T> {
    return new Promise<T>((resolve) => {
      this.http.post<T>(url, data).subscribe((response) => {
        resolve(response);
      });
    });
  }

  public async fetchGet<T>(url: string): Promise<T> {
    return new Promise<T>((resolve) => {
      this.http.get<T>(url).subscribe((response) => {
        resolve(response);
      });
    });
  }
}
