import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class MainService {
  baseUrl: string = "https://reqres.in/api/basket";

  constructor(private httpClient: HttpClient) { }

  /**
   * Add an item to the basket, both passed by parameter
   * @param basket
   * @param item
   */
  add(basket, item) {
    return new Promise(resolve => {
      let newItem = Object.assign({}, item);
      basket.push(newItem);
      resolve(true); // I guess in real life this promise will be resolved if the product is actually added to a basket via an ajax call
    });
  }

  /**
   * Remove one item from the basket or all the items with the same type, both passed by parameter
   * @param basket
   * @param item
   */
  delete(basket, selected, deleteAll) {
    return new Promise(resolve => {
      if (deleteAll) {
        let index;
        while ((index = basket.findIndex(item => item.name === selected.name)) !== -1) {
          if (index === 0 && basket.length > 1) {
            basket[1].price_pennies = basket[1].price_pennies + 500;
          }
          basket.splice(index, 1);
        }
      }
      else {
        const index = basket.findIndex(item => item.name === selected.name);
        if (index === 0 && basket.length > 1) {
          basket[1].price_pennies = basket[1].price_pennies + 500;
        }
        basket.splice(index, 1);
      }
      resolve(true); // I guess in real life this promise will be resolved if the product is actually removed from the basket via an ajax call
    });
  }

  /**
   * Post the basket data passed by parameter
   * @param obj
   */
  postBasket(obj) {
    return this.httpClient.post(this.baseUrl, obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map(data => {
      return data;
    }));
  }

  getApiData(url) {
    return this.httpClient.get<any[]>(
      url, { observe: 'response' });
  }
}