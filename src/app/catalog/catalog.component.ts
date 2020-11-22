import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: any;

  constructor(private productService: ProductServiceService,
              private router: Router) { }

  async ngOnInit() {
    this.products = await this.productService.get();
  }

  onAdd() {
    this.router.navigate(['/product']);
  }
  
  onDelete(id: number) {
    if (window.confirm('Do you want to delete this product?')) {
      this.productService.deleteProduct(id)
          .subscribe(x => console.log(x), error => console.error('error', error)); 
      this.router.navigate(['/catalog', window.location.reload()]);
    }
  }
}
