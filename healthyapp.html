import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
// Added FormsModule for completeness, though ReactiveFormsModule is used
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms'; 
// Added necessary imports for bootstrapping the application
import { bootstrapApplication } from '@angular/platform-browser';
// FIX: Import TitleCasePipe from @angular/common to resolve NG0302 error
import { TitleCasePipe } from '@angular/common'; 

// --- INTERFACES AND MOCK DATA ---
// Interface updated to match the structure of the provided products.json
interface Product {
  prodid: number;
  shortdesc: string; // FIELD FROM YOUR JSON
  longdesc: string;
  unitsize: string; // FIELD FROM YOUR JSON
  unitprice: string; // FIELD FROM YOUR JSON (string due to '$' prefix)
}

// Mock data replacing products.json (using the user-provided data)
const PRODUCTS: Product[] = [
  {
    prodid: 1,
    shortdesc: "Cherry Choc",
    longdesc: "Dried cherry pieces covered with dark chocolate",
    unitsize: "2.4 oz",
    unitprice: "$2.30" 
  },
  {
    prodid: 2,
    shortdesc: "Mixed Nuts",
    longdesc: "Organic mixed nuts lightly salted",
    unitsize: "5.0 oz",
    unitprice: "$4.89" 
  },
  {
    prodid: 3,
    shortdesc: "Dry Fruits",
    longdesc: "Mix of different dry fruits",
    unitsize: "1.2 oz",
    unitprice: "$1.25" 
  },
  {
    prodid: 4,
    shortdesc: "Honey Almond",
    longdesc: "Organic honey roasted almonds",
    unitsize: "2.4 oz",
    unitprice: "$3.50" 
  },
  {
    prodid: 5,
    shortdesc: "Big Pops",
    longdesc: "Big bags of organic popcorn - different flavors",
    unitsize: "24 oz",
    unitprice: "$4.65" 
  },
];

// --- APP COMPONENT DEFINITION ---

@Component({
  selector: 'app-root',
  standalone: true,
  // FIX APPLIED: Added TitleCasePipe to the imports array
  imports: [ReactiveFormsModule, FormsModule, TitleCasePipe], 
  template: `
    <!-- Neutral Background: Light Gray -->
    <div class="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      <!-- Navigation Bar: Dark Gray/Black -->
      <header class="sticky top-0 z-10 shadow-lg bg-gray-900 text-white">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 class="text-2xl font-bold tracking-wider">NutriDelight Co.</h1>
          <div class="flex space-x-4">
            <!-- Navigation Links -->
            @for (page of ['home', 'products', 'contact']; track page) {
              <button 
                (click)="currentPage.set(page)"
                [class]="getNavLinkClasses(page)"
              >
                {{ page | titlecase }}
              </button>
            }
          </div>
        </nav>
      </header>

      <!-- Main Content Area -->
      <main class="max-w-7xl mx-auto p-6 md:p-8">
        @switch (currentPage()) {
          @case ('home') {
            <!-- Home Page -->
            <section class="p-6 bg-white rounded-xl shadow-xl border-t-4 border-blue-500/50">
              <h2 class="text-4xl font-extrabold text-gray-800 mb-4">Welcome to NutriDelight Co.</h2>
              <p class="mb-4 text-lg text-gray-700">
                At NutriDelight, we are dedicated to sourcing and preparing the finest selection of nut-related products, savory popcorn, and delicious dry fruits. Our commitment is to quality, ensuring every bite is packed with freshness and flavor. We believe in providing wholesome, satisfying snacks for every occasion.
              </p>
              <p class="text-lg text-gray-700">
                Dive into our extensive collection of healthy and indulgent treats today.
                <button (click)="currentPage.set('products')" class="ml-2 font-semibold text-blue-600 hover:text-blue-700 underline transition">
                    Visit our Products page
                </button> 
                or 
                <button (click)="currentPage.set('contact')" class="ml-1 font-semibold text-blue-600 hover:text-blue-700 underline transition">
                    Contact us
                </button> for any inquiries!
              </p>
            </section>
          }

          @case ('products') {
            <!-- Products Page -->
            <h2 class="text-4xl font-extrabold text-gray-800 mb-6 border-b pb-2 border-blue-500">Our Premium Selection</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              @for (product of productsList(); track product.prodid) {
                <!-- Each product is presented in an article element -->
                <article class="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300">
                  
                  <!-- Short Name (h3 in bold) -->
                  <h3 class="text-2xl font-bold text-gray-700 mb-2 border-b border-gray-100 pb-1">
                    {{ product.shortdesc }}
                  </h3>
                  
                  <!-- Long Description -->
                  <p class="text-gray-600 text-sm mb-3">
                    {{ product.longdesc }}
                  </p>
                  
                  <!-- Unit Size and Price -->
                  <!-- Price box uses a light gray background and blue accent border -->
                  <p class="text-base font-medium text-gray-900 bg-gray-100 p-2 rounded-lg border-l-4 border-blue-500">
                    <span class="font-bold">Unit Size:</span> {{ product.unitsize }} &mdash; 
                    <span class="font-bold">Price:</span> {{ product.unitprice }}
                  </p>
                </article>
              }
            </div>
          }

          @case ('contact') {
            <!-- Contact Page -->
            <section class="p-6 bg-white rounded-xl shadow-xl border-t-4 border-blue-500/50">
              <h2 class="text-4xl font-extrabold text-gray-800 mb-6">Get in Touch</h2>
              
              <!-- Contact Form -->
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">

                <!-- Full Name Field -->
                <div>
                  <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
                  <!-- Focus ring uses blue accent -->
                  <input id="fullName" type="text" formControlName="fullName"
                    class="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    [class.border-red-500]="isInvalid('fullName')"
                    placeholder="E.g., John Doe">
                  @if (isInvalid('fullName', true)) {
                    <p class="mt-1 text-xs text-red-600">
                      @if (contactForm.get('fullName')?.errors?.['required']) {
                        Full Name is required.
                      }
                      @if (contactForm.get('fullName')?.errors?.['minlength']) {
                        Name must be at least 5 characters.
                      }
                    </p>
                  }
                </div>

                <!-- Email Address Field -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                  <!-- Focus ring uses blue accent -->
                  <input id="email" type="email" formControlName="email"
                    class="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    [class.border-red-500]="isInvalid('email')"
                    placeholder="E.g., name@example.com">
                  @if (isInvalid('email', true)) {
                    <p class="mt-1 text-xs text-red-600">
                      @if (contactForm.get('email')?.errors?.['required']) {
                        Email is required.
                      }
                      @if (contactForm.get('email')?.errors?.['email']) {
                        Must be a valid email address format.
                      }
                    </p>
                  }
                </div>

                <!-- Message Field -->
                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                  <!-- Focus ring uses blue accent -->
                  <textarea id="message" formControlName="message" rows="4"
                    class="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    [class.border-red-500]="isInvalid('message')"
                    placeholder="Your inquiry..."></textarea>
                  @if (isInvalid('message', true)) {
                    <p class="mt-1 text-xs text-red-600">Message is required.</p>
                  }
                </div>

                <!-- Submit Button: Blue accent -->
                <button type="submit" 
                  [disabled]="contactForm.invalid"
                  class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                         bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition
                         disabled:opacity-50 disabled:cursor-not-allowed">
                  Submit Inquiry
                </button>
              </form>
              
              <!-- Submission Confirmation Section: Light Green for Success -->
              @if (submittedData()) {
                <section class="mt-8 p-4 bg-green-50 border border-green-300 rounded-lg text-gray-800"
                         style="font-size: 0.85rem;">
                  <h3 class="text-lg font-semibold text-green-700 mb-2">Form submitted successfully!</h3>
                  <p class="mb-1"><span class="font-medium">Full Name:</span> {{ submittedData().fullName }}</p>
                  <p class="mb-1"><span class="font-medium">Email:</span> {{ submittedData().email }}</p>
                  <p><span class="font-medium">Message:</span> {{ submittedData().message }}</p>
                </section>
              }
            </section>
          }
        }
      </main>
    </div>
  `,
  // The 'styles' array is kept empty as all styling is done via Tailwind CSS classes in the template.
  styles: [], 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // State for routing: Signal for reactive state updates
  currentPage = signal<'home' | 'products' | 'contact'>('home');

  // Product data signal (simulating fetching data)
  productsList = signal<Product[]>(PRODUCTS);

  // State for form submission result
  submittedData = signal<any | null>(null);

  // Reactive Form Group setup
  contactForm: FormGroup;

  constructor() {
    // Initialize the Reactive Form in the constructor
    this.contactForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required]),
    });
  }

  // Helper method for navigation styling
  getNavLinkClasses(page: 'home' | 'products' | 'contact') {
    const baseClasses = 'px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out';
    if (this.currentPage() === page) {
      // Active state: White text, blue background, subtle border
      return `${baseClasses} bg-blue-600 text-white border-b-2 border-blue-300`;
    } else {
      // Inactive state: Light gray text, dark gray hover
      return `${baseClasses} text-gray-300 hover:bg-gray-700 hover:text-white`;
    }
  }

  // Helper method to check form control validation state
  isInvalid(controlName: string, checkDirty: boolean = false): boolean {
    const control = this.contactForm.get(controlName);
    // Return true if the control exists, has errors, and is either dirty/touched OR we aren't checking for dirty/touched status
    if (checkDirty) {
        return !!control && control.invalid && (control.dirty || control.touched);
    }
    return !!control && control.invalid;
  }

  // Form submission handler
  onSubmit(): void {
    if (this.contactForm.valid) {
      // Capture the submitted form data
      const data = this.contactForm.value;
      
      // Update the signal to display the confirmation section
      this.submittedData.set(data);

      // Optionally, reset the form for a new entry (uncomment to enable)
      // this.contactForm.reset();
      
      console.log('Form Submitted:', data);
    }
  }
}

// --- BOOTSTRAPPING LOGIC (Added for robust execution) ---
// This part is crucial for running the standalone component in a browser environment 
// by explicitly starting the Angular application.
try {
  bootstrapApplication(App)
    .catch(err => console.error('Angular Bootstrap Error:', err));
} catch (e) {
  console.error("Failed to bootstrap Angular application. Ensure required Angular libraries are loaded.", e);
}
