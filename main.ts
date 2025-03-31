import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <img src="https://placehold.co/120x40?text=Vitalia" alt="Vitalia Logo" class="logo">
      <div class="search-bar">
        <input type="text" placeholder="Search" (input)="onSearch($event)">
      </div>
      <img src="https://placehold.co/40x40" alt="Profile" class="profile-pic">
    </header>
  `
})
class HeaderComponent {
  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    console.log('Searching for:', searchTerm);
  }
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="products-header">
      <div class="products-title">
        <h2>Products</h2>
        <span>Products list</span>
      </div>
      <button class="add-product-btn" (click)="addProduct()">Add Product</button>
    </div>
    
    <table class="products-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let product of products()">
          <td>{{ product.name }}</td>
          <td>
            <img [src]="product.image" [alt]="product.name" class="product-image">
          </td>
          <td>{{ product.price | currency:'USD' }}</td>
          <td class="action-menu">
            <button class="action-btn" (click)="toggleMenu(product.id)">⋮</button>
            <div class="action-dropdown" *ngIf="activeMenu() === product.id">
              <div class="action-item" (click)="viewProduct(product)">
                <span>👁️ View</span>
              </div>
              <div class="action-item" (click)="editProduct(product)">
                <span>✏️ Edit</span>
              </div>
              <div class="action-item" (click)="deleteProduct(product.id)">
                <span>🗑️ Delete</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
class ProductsComponent {
  products = signal<Product[]>([
    { id: 1, name: 'Vitamin C', image: 'https://placehold.co/50x50', price: 18.00 },
    { id: 2, name: 'Iron Supplements', image: 'https://placehold.co/50x50', price: 35.00 },
    { id: 3, name: 'Beef Stroganoff', image: 'https://placehold.co/50x50', price: 28.00 },
    { id: 4, name: 'Grilled Shrimp Skewers', image: 'https://placehold.co/50x50', price: 23.00 },
    { id: 5, name: 'Grilled Chicken Salad', image: 'https://placehold.co/50x50', price: 18.00 },
    { id: 6, name: 'Mediterranean Chicken Salad', image: 'https://placehold.co/50x50', price: 35.00 }
  ]);

  activeMenu = signal<number | null>(null);

  toggleMenu(productId: number) {
    this.activeMenu.set(this.activeMenu() === productId ? null : productId);
  }

  addProduct() {
    const newProduct: Product = {
      id: this.products().length + 1,
      name: 'New Product',
      image: 'https://placehold.co/50x50',
      price: 0.00
    };
    this.products.update(products => [...products, newProduct]);
    console.log('Adding new product');
  }

  viewProduct(product: Product) {
    console.log('Viewing product:', product);
    this.activeMenu.set(null);
  }

  editProduct(product: Product) {
    console.log('Editing product:', product);
    this.activeMenu.set(null);
  }

  deleteProduct(productId: number) {
    this.products.update(products => products.filter(p => p.id !== productId));
    this.activeMenu.set(null);
    console.log('Deleted product:', productId);
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ProductsComponent],
  template: `
    <app-header></app-header>
    <div class="container">
      <app-products></app-products>
    </div>
  `
})
export class App {}

bootstrapApplication(App);