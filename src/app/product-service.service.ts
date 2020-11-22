import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private httpClient: HttpClient) { }

  get() {
    return this.httpClient.get('http://localhost:5000/api/products');
  }

  getProduct(id: number) {
    return this.httpClient.get(`http://localhost:5000/api/products/${id}`);
  }

  postProduct(product: any) {
    return this.httpClient.post(
      'http://localhost:5000/api/products',
      product,
      {
        responseType: "json",
        withCredentials: false
      }
    );
  }

  putProduct(id: number, product: any) {
    return this.httpClient.put(
      `http://localhost:5000/api/products/${id}`,
      product,
      {
        responseType: "json",
        withCredentials: false
      }
    );
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(`http://localhost:5000/api/products/${id}`,
    {
      responseType: "json",
      withCredentials: false
    });
  }

}
