import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { fromEventPattern } from 'rxjs';
import { ProductServiceService } from '../product-service.service';
import { Product } from '../models/product.model';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product = {
    id: 0,
    name: '',
    price: 1,
    company: '',
    ageRestriction: 0,
    description: ''
  };

  productForm: FormGroup = this.fb.group({
    name: [this.product.name, [Validators.required, Validators.maxLength(50)]],
    price: [this.product.price, [Validators.required, Validators.min(1), Validators.max(1000)]],
    company: [this.product.company, [Validators.required, Validators.maxLength(50)]],
    ageRestriction: [this.product.ageRestriction, [Validators.min(0), Validators.max(100)]],
    description: [this.product.description, [Validators.maxLength(100)]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async param => {
      if (param.id) {
        let fetchedProduct = await this.productService.getProduct(param.id).toPromise() as Product;
        this.product = fetchedProduct;
        this.productForm.get('name').setValue(this.product.name);
        this.productForm.get('price').setValue(this.product.price);
        this.productForm.get('company').setValue(this.product.company);
        this.productForm.get('ageRestriction').setValue(this.product.ageRestriction);
        this.productForm.get('description').setValue(this.product.description);
        console.log(this.product);
      }
    });
  }

  onSubmit(): void {
    if(!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      return;
    }
    
    let productFormValue = this.productForm.value as Product;
      productFormValue.id = this.product.id;

    if(this.product.id == 0) {
      this.productService.postProduct(productFormValue)
          .subscribe(x => console.log(x), error => console.error('error', error));
    }
    else {
      this.productService.putProduct(productFormValue.id, productFormValue)
          .subscribe(x => console.log(x), error => console.error('error', error));
    }

    this.router.navigate(['/catalog', window.location.reload()]);

  }

  onReturnHome(): void {
    this.router.navigate(['/catalog']);
  }

  get name() { return this.productForm.get('name'); }
  get price() { return this.productForm.get('price'); }
  get company() { return this.productForm.get('company'); }
  get ageRestriction() { return this.productForm.get('ageRestriction'); }
  get description() { return this.productForm.get('description'); }
}
