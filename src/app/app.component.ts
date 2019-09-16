import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MainService } from './main.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [MainService]
})
export class AppComponent implements OnInit {
  basket: any[] = [];
  products: any = [];
  total: number = 0;
  totalToDisplay: string = "";
  basketData = [];
  placeOrderForm: FormGroup;
  submitted: boolean = false;

  constructor(private MainService: MainService, private formBuilder: FormBuilder) { }

  /**
   * Init
   */
  ngOnInit() {
    // with angular HTTP client
    let urlProducts = "/api/products.json";
    this.MainService.getApiData(urlProducts).subscribe((response) => {
      if (response.status === 200) {
        this.products = response.body;
        response.body.forEach((element, index) => {
          let urlProduct = `/api/products/${element.id}.json`;
          this.MainService.getApiData(urlProduct).subscribe((response) => {
            if (response.status === 200) {
              Object.assign(this.products[index], response.body); // Suggested APIs on src/api folder
            }
          });
        });
      }
    });

    // With fetch
    // fetch("/api/products.json")
    //   .then(r => r.json())
    //   .then(data => {
    //     this.products = data;
    //     data.forEach((element, index) => {
    //       fetch(`/api/products/${element.id}.json`)
    //         .then(r => r.json()).then(dataElement => {
    //           Object.assign(this.products[index], dataElement); // Suggested APIs on src/api folder
    //         });
    //     });
    //   });

    this.placeOrderForm = this.formBuilder.group({
      emailaddress: ['', [Validators.required, Validators.email, Validators.pattern('.*(@bloomandwild.com|@bloomandwild.de|@bloomandwild.fr)$')]],
    });
  }

  /**
   * Add an item to the Basket via service
   * @param item
   */
  addToBasket(item: any): void {
    this.MainService.add(this.basket, item).then(() => {
      this.updateDiscount();
      this.updateTotalAndBasketData();
    });
  }

  /**
  * Remove one item from Basket via service
  * @param item
  */
  removeFromBasket(item: any, deleteAll: boolean): void {
    this.MainService.delete(this.basket, item, deleteAll).then(() => {
      this.updateTotalAndBasketData();
    });
  }

  /**
   * Update products in the basket following the business logic
   */
  updateDiscount(): void {
    if (this.basket.length !== 1) {
      this.basket[this.basket.length - 1].price_pennies = this.basket[this.basket.length - 1].price_pennies - 500;
    }
  }

  /**
   * Update total and basket data
   */
  updateTotalAndBasketData(): void {
    this.basketData = [];
    this.buildBasketData();
    this.total = this.basketData.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.subtotal;
    }, 0) / 100;

    // Display the total with the currency symbol
    if (this.total !== 0) {
      this.totalToDisplay = this.basketData[0].currency + this.total.toFixed();
    }
  }

  /**
   * Build the view which will be used to display the grouped items on the basket
   */
  buildBasketData(): void {
    let arrayNamedGroup = this.groupArrayByKey(this.basket, 'name');
    Object.keys(arrayNamedGroup).forEach(item => {
      this.basketData.push(
        {
          name: item,
          id: arrayNamedGroup[item][0].id,
          currency: arrayNamedGroup[item][0].currency,
          quantity: arrayNamedGroup[item].length,
          subtotal: (arrayNamedGroup[item].map(item => item.price_pennies))
            .reduce(function (accumulator, currentValue) {
              return accumulator + currentValue;
            }, 0)
        }
      );
    });
  }

  /**
   * This is an utility function to group an array by key, passed by parameters
   * It should probably be moved outside the controller
   * @param data
   * @param key
   */
  groupArrayByKey(data, key) {
    return data.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  /**
   * Submit the form
   */
  submitForm() {
    this.placeOrderForm.controls.emailaddress.markAsTouched(); // this is to handle the case of a pristine submitted form

    if (this.placeOrderForm.valid) {
      // Create the data to post
      let data = {
        email: this.placeOrderForm.controls.emailaddress.value,
        products: this.basketData.map(item => {
          return {
            id: item.id,
            quantity: item.quantity
          };
        })
      }

      this.MainService.postBasket(data).subscribe((response) => {
        console.log("response", response);
        this.submitted = true;
      });
    }
  }

  // getter for easy access to form fields
  get f() { return this.placeOrderForm.controls; }
}

