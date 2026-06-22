
// // Part 9: Code Organization - Custom Command registered at the very top
// Cypress.Commands.add('login', (email, password) => {
//   cy.visit('https://automationexercise.com');
//   cy.get('[data-qa="login-email"]').type(email);
//   cy.get('[data-qa="login-password"]').type(password);
//   cy.get('[data-qa="login-button"]').click({ force: true });
// });

// describe('Automation Exercise - Full Assignment Suite', () => {
//   const baseUrl = 'https://automationexercise.com';
//   const password = 'Password123!';

//   beforeEach(() => {
//     // Rigid network intercepts to completely neutralize background ad servers
//     cy.intercept('GET', '**/pagead/**', { statusCode: 200, body: {} });
//     cy.intercept('GET', '**googlesyndication**', { statusCode: 200, body: {} });
//     cy.intercept('GET', '**/adsbygoogle/**', { statusCode: 200, body: {} });
    
//     cy.visit(baseUrl);

//     // Destroys overlay ad wrappers if they try to render over the viewport
//     cy.get('body').then(($body) => {
//       if ($body.find('.modal-content').length > 0) {
//         cy.get('.modal-content').invoke('remove');
//       }
//     });
//   });

//   // Part 2: Homepage Test
//   it('Test Case 1: Verify Homepage Loads', () => {
//     cy.url().should('eq', `${baseUrl}/`);
//     cy.get('.logo img').should('be.visible');
//     cy.get('.shop-menu').should('be.visible');
//     cy.contains('Signup / Login').should('be.visible');
//   });

//   // Part 3: User Registration
//   it('Test Case 2: Register a New User', () => {
//     const regEmail = `student${Date.now()}@test.com`; // Matches prompt format hint explicitly

//     cy.visit(`${baseUrl}/login`);
//     cy.get('[data-qa="signup-name"]').type('QA Student');
//     cy.get('[data-qa="signup-email"]').type(regEmail);
//     cy.get('[data-qa="signup-button"]').click({ force: true });

//     // Fill account details
//     cy.get('#id_gender1').check();
//     cy.get('[data-qa="password"]').type(password);
//     cy.get('[data-qa="days"]').select('1');
//     cy.get('[data-qa="months"]').select('January');
//     cy.get('[data-qa="years"]').select('2000');

//     // Fill address information
//     cy.get('[data-qa="first_name"]').type('QA');
//     cy.get('[data-qa="last_name"]').type('Student');
//     cy.get('[data-qa="address"]').type('123 Test Street');
//     cy.get('[data-qa="country"]').select('United States');
//     cy.get('[data-qa="state"]').type('California');
//     cy.get('[data-qa="city"]').type('Los Angeles');
//     cy.get('[data-qa="zipcode"]').type('90001');
//     cy.get('[data-qa="mobile_number"]').type('1234567890');

//     cy.get('[data-qa="create-account"]').click({ force: true });
//     cy.contains('Account Created!', { timeout: 10000 }).should('be.visible');
    
//     // Force a clean home visit to jump past the dangerous interstitial ad page
//     cy.visit(baseUrl);
//     cy.contains('Logged in as').should('be.visible');

//     // Delete the account at the end of the test as required
//     cy.contains('Delete Account').click({ force: true });
//     cy.contains('Account Deleted!', { timeout: 10000 }).should('be.visible');
//   });

//   // Part 4: Login and Logout
//   it('Test Case 3: Login With Valid Credentials', () => {
//     const loginEmail = `student${Date.now()}@test.com`;

//     // Register a user first since the previous one was deleted
//     cy.visit(`${baseUrl}/login`);
//     cy.get('[data-qa="signup-name"]').type('Login Student');
//     cy.get('[data-qa="signup-email"]').type(loginEmail);
//     cy.get('[data-qa="signup-button"]').click({ force: true });
//     cy.get('#id_gender1').check();
//     cy.get('[data-qa="first_name"]').type('Login');
//     cy.get('[data-qa="last_name"]').type('Student');
//     cy.get('[data-qa="password"]').type(password);
//     cy.get('[data-qa="address"]').type('123 Test Street');
//     cy.get('[data-qa="state"]').type('California');
//     cy.get('[data-qa="city"]').type('Los Angeles');
//     cy.get('[data-qa="zipcode"]').type('90001');
//     cy.get('[data-qa="mobile_number"]').type('1234567890');
//     cy.get('[data-qa="create-account"]').click({ force: true });
//     cy.visit(baseUrl);
//     cy.contains('Logout').click({ force: true });

//     // Execute the actual login testing steps via your custom command
//     cy.login(loginEmail, password);
//     cy.contains('Logged in as').should('be.visible');

//     cy.contains('Logout').click({ force: true });
//     cy.url().should('include', '/login');
//   });

//   it('Test Case 4: Login With Invalid Credentials', () => {
//     cy.visit(`${baseUrl}/login`);
//     cy.get('[data-qa="login-email"]').type('invalid_student_user@test.com');
//     cy.get('[data-qa="login-password"]').type('WrongPassword123!');
//     cy.get('[data-qa="login-button"]').click({ force: true });
//     cy.contains('Your email or password is incorrect!').should('be.visible');
//   });

//   // Part 5: Product Search
//   it('Test Case 5: Search for a Product', () => {
//     cy.visit(`${baseUrl}/products`);
//     cy.get('#search_product').type('dress');
//     cy.get('#submit_search').click();
//     cy.get('.features_items').should('be.visible');
//     cy.get('.features_items').contains('Dress', { matchCase: false }).should('be.visible');
//   });

//   // Part 6: Product Details
//   it('Test Case 6: View Product Details', () => {
//     cy.visit(`${baseUrl}/products`);
//     cy.get('.choose > .nav > li > a').first().click();
    
//     cy.get('.product-information h2').should('be.visible'); 
//     cy.get('.product-information').contains('Category:').should('be.visible'); 
//     cy.get('.product-information').contains('Rs.').should('be.visible'); 
//     cy.get('.product-information').contains('Availability:').should('be.visible'); 
//     cy.get('.product-information').contains('Condition:').should('be.visible'); 
//     cy.get('.product-information').contains('Brand:').should('be.visible'); 
//   });

//   // Part 7: Cart Functionality
//   it('Test Case 7: Add Product to Cart', () => {
//     cy.visit(`${baseUrl}/products`);
//     cy.get('.productinfo .add-to-cart').first().click({ force: true });
//     cy.visit(`${baseUrl}/view_cart`);
    
//     cy.get('#cart_info_table tbody tr').should('have.length.at.least', 1);
//     cy.get('.cart_price').should('be.visible');
//     cy.get('.cart_quantity').should('be.visible');
//   });

//   it('Test Case 8: Remove Product From Cart', () => {
//     cy.visit(`${baseUrl}/products`);
//     cy.get('.productinfo .add-to-cart').first().click({ force: true });
//     cy.visit(`${baseUrl}/view_cart`);
    
//     cy.get('.cart_quantity_delete').first().click({ force: true });
//     cy.get('#cart_info_table tbody tr').should('not.exist');
//   });

//   // Part 8: Contact Form
//   it('Test Case 9: Submit Contact Us Form', () => {
//     cy.visit(`${baseUrl}/contact_us`);
//     cy.get('[data-qa="name"]').type('QA Student');
//     cy.get('[data-qa="email"]').type('student@test.com');
//     cy.get('[data-qa="subject"]').type('Assignment Submission');
//     cy.get('[data-qa="message"]').type('Automated test transmission complete.');

//     // Upload placeholder file natively without external plugins
//     cy.get('input[name="upload_file"]').selectFile({
//       contents: Cypress.Buffer.from('{}'),
//       fileName: 'example.json',
//       mimeType: 'application/json'
//     });

//     cy.on('window:confirm', (text) => {
//       expect(text).to.contain('Press OK to proceed');
//       return true;
//     });

//     cy.get('[data-qa="submit-button"]').click({ force: true });
//     cy.get('.status').should('be.visible').and('contain', 'Success!');
//   });

//   // Part 10: Challenge Tasks (Challenge 1 - Add Multiple Products)
//   it('Challenge 1: Add Multiple Products', () => {
//     cy.visit(`${baseUrl}/products`);
//     cy.get('.productinfo .add-to-cart').eq(0).click({ force: true });
//     cy.get('.productinfo .add-to-cart').eq(1).click({ force: true });
    
//     cy.visit(`${baseUrl}/view_cart`);
//     cy.get('#cart_info_table tbody tr').should('have.length.at.least', 2);
//   });

//   // Part 10: Challenge Tasks (Challenge 3 - Subscribe to Newsletter)
//   it('Challenge 3: Subscribe to Newsletter', () => {
//     cy.get('#footer').scrollIntoView();
//     cy.get('#susbscribe_email').type(`subscribe_${Date.now()}@test.com`);
//     cy.get('#subscribe').click();
//     cy.get('.alert-success').should('be.visible').and('contain', 'You have been successfully subscribed!');
//   });
// });


// ==========================================
// 1. CUSTOM COMMANDS SETUP
// ==========================================
// Cypress.Commands.add('login', (email, password) => {
//   cy.get('a[href="/login"]').click();
//   cy.get('[data-qa="login-email"]').type(email);
//   cy.get('[data-qa="login-password"]').type(password);
//   cy.get('[data-qa="login-button"]').click();
// });


// describe('Automation Exercise E-commerce Suite', () => {

//   Cypress.on('uncaught:exception', () => {
//     return false;
//   });


//   // beforeEach(() => {
//   //   cy.visit('https://automationexercise.com');
//   //   cy.get('body', { timeout: 15000 }).should('be.visible');

//   //   cy.get('body').then(($body) => {
//   //     if ($body.find('.modal-content').length > 0) {
//   //       cy.get('.modal-content').invoke('remove');
//   //     }
//   //   });
//   // });

//   beforeEach(() => {
//   cy.intercept('https://googlesyndication.com**', { statusCode: 200, body: '' });
//   cy.intercept('https://doubleclick.net**', { statusCode: 200, body: '' });
//   // ... remainder of your visits
// });

//   it('Test Case 1: Verify Homepage Loads', () => {
//     cy.get('.logo img').should('be.visible');
//     cy.get('.shop-menu').should('be.visible');
//     cy.get('a[href="/login"]').should('be.visible');
//   });

//   it('Test Case 2: Register a New User', () => {
//     const email = `student${Date.now()}@test.com`;

//     cy.get('a[href="/login"]').click();
//     cy.get('[data-qa="signup-name"]').type('Test Student');
//     cy.get('[data-qa="signup-email"]').type(email);
//     cy.get('[data-qa="signup-button"]').click();

//     cy.get('#id_gender1').check();
//     cy.get('[data-qa="password"]').type('StudentPassword123');
//     cy.get('[data-qa="days"]').select('10');
//     cy.get('[data-qa="months"]').select('June');
//     cy.get('[data-qa="years"]').select('2000');

//     cy.get('[data-qa="first_name"]').type('Test');
//     cy.get('[data-qa="last_name"]').type('Student');
//     cy.get('[data-qa="address"]').type('123 School Lane');
//     cy.get('[data-qa="country"]').select('United States');
//     cy.get('[data-qa="state"]').type('California');
//     cy.get('[data-qa="city"]').type('Los Angeles');
//     cy.get('[data-qa="zipcode"]').type('90001');
//     cy.get('[data-qa="mobile_number"]').type('1234567890');

//     cy.get('[data-qa="create-account"]').click();
//     cy.contains('Account Created!').should('be.visible');

//     cy.get('[data-qa="continue-button"]').click();
//     cy.contains('Logged in as').should('be.visible');

//     cy.get('a[href="/delete_account"]').click();
//     cy.get('[data-qa="account-deleted"]').should('be.visible');
//   });

//   it('Test Case 3: Login With Valid Credentials', () => {
//     const loginEmail = `login_student${Date.now()}@test.com`;

//     cy.get('a[href="/login"]').click();
//     cy.get('[data-qa="signup-name"]').type('Test Student');
//     cy.get('[data-qa="signup-email"]').type(loginEmail);
//     cy.get('[data-qa="signup-button"]').click();

//     cy.get('#id_gender1').check();
//     cy.get('[data-qa="password"]').type('StudentPassword123');
//     cy.get('[data-qa="first_name"]').type('Test');
//     cy.get('[data-qa="last_name"]').type('Student');
//     cy.get('[data-qa="address"]').type('123 School Lane');
//     cy.get('[data-qa="country"]').select('United States');
//     cy.get('[data-qa="state"]').type('California');
//     cy.get('[data-qa="city"]').type('Los Angeles');
//     cy.get('[data-qa="zipcode"]').type('90001');
//     cy.get('[data-qa="mobile_number"]').type('1234567890');
//     cy.get('[data-qa="create-account"]').click();
//     cy.get('[data-qa="continue-button"]').click();

//     cy.get('a[href="/logout"]').click();

//     cy.login(loginEmail, 'StudentPassword123');
//     cy.contains('Logged in as').should('be.visible');

//     cy.get('a[href="/logout"]').click();
//     cy.url().should('include', '/login');
//   });

//   it('Test Case 4: Login With Invalid Credentials', () => {
//     cy.login('invalid_student_user@wrong.com', 'BadPassword999');
//     cy.get('.login-form form').should('contain', 'incorrect');
//   });

//   it('Test Case 5: Search for a Product', () => {
//     cy.get('a[href="/products"]').click();
//     cy.url().should('include', '/products');
//     cy.get('#search_product').type('dress');
//     cy.get('#submit_search').click();
//     cy.get('.title').should('contain', 'Searched Products');
//     cy.get('.productinfo').first().invoke('text').then((text) => {
//       expect(text.toLowerCase()).to.include('dress');
//   });

//   it('Test Case 6: View Product Details', () => {
//     cy.get('a[href="/products"]').click();
//     cy.get('.choose a').first().click();
//     cy.get('.product-information h2').should('be.visible');
//     cy.get('.product-information p').should('contain', 'Category');
//     cy.get('.product-information span span').should('be.visible');
//     cy.get('.product-information').should('contain', 'Availability');
//     cy.get('.product-information').should('contain', 'Condition');
//     cy.get('.product-information').should('contain', 'Brand');
//   });

//   it('Test Case 7: Add Product to Cart', () => {
//     cy.get('a[href="/products"]').click();
//     cy.get('.productinfo .add-to-cart').first().click({ force: true });
//     cy.get('.modal-body a[href="/view_cart"]').click();
//     cy.get('#cart_info_table').should('be.visible');
//     cy.get('.cart_quantity').should('be.visible');
//     cy.get('.cart_price').should('be.visible');
//   });

//   it('Test Case 8: Remove Product From Cart', () => {
//     cy.get('a[href="/products"]').click();
//     cy.get('.productinfo .add-to-cart').first().click({ force: true });
//     cy.get('.modal-body a[href="/view_cart"]').click();
//     cy.get('.cart_quantity_delete').click();
//     cy.get('#empty_cart').should('be.visible');
//   });

//   it('Test Case 9: Submit Contact Us Form', () => {
//     cy.get('a[href="/contact_us"]').click();
//     cy.get('[data-qa="name"]').type('Test Student');
//     cy.get('[data-qa="email"]').type('student@test.com');
//     cy.get('[data-qa="subject"]').type('Homework Assignment');
//     cy.get('[data-qa="message"]').type('Automated testing script executed successfully.');

//     cy.on('window:confirm', (text) => {
//       expect(text).to.contains('Press OK to proceed');
//       return true;
//     });

//     cy.get('[data-qa="submit-button"]').click();
//     cy.get('.status').should('contain', 'Success');
//   });

//   it('Challenge 1: Add Multiple Products', () => {
//     cy.get('a[href="/products"]').click();
//     cy.get('.productinfo .add-to-cart').eq(0).click({ force: true });
//     cy.get('.close-modal').should('be.visible').click();
//     cy.get('.add-to-cart').eq(2).click();
//     cy.get('.modal-body a[href="/view_cart"]').click();
//     cy.get('#cart_info_table tbody tr').should('have.length.at.least', 2);
//   });

//   it('Challenge 3: Subscribe to Newsletter', () => {
//     cy.get('#footer').scrollIntoView();
//     cy.get('#susbscribe_email').type('newsletter_student@test.com');
//     cy.get('#subscribe').click();
//     cy.get('.alert-success').should('be.visible');
//   });
// })



Cypress.Commands.add('login', (email, password) => {
  cy.visit('https://automationexercise.com/login'); // Clean direct access route
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(password);
  cy.get('[data-qa="login-button"]').click({ force: true });
});


describe('Automation Exercise E-commerce Suite', () => {
  const baseUrl = 'https://automationexercise.com'; // FIX: This line must be here

  beforeEach(() => {
    cy.intercept('GET', '**/pagead/**', { statusCode: 200, body: {} });
    cy.intercept('GET', '**googlesyndication**', { statusCode: 200, body: {} });
    cy.intercept('GET', '**/adsbygoogle/**', { statusCode: 200, body: {} });
    cy.intercept('GET', '**adtrafficquality**', { statusCode: 200, body: {} });
    
    cy.visit(baseUrl);
  });

  
// describe('Automation Exercise E-commerce Suite', () => {

//   Cypress.on('uncaught:exception', () => {
//     // Gracefully digest random third-party application console errors
//     return false;
//   });

//   // beforeEach(() => {
//   //   // FIXED: Global wildcard matches to neutralize advertisement dependencies completely
//   //   cy.intercept('GET', '**/pagead/**', { statusCode: 200, body: {} });
//   //   cy.intercept('GET', '**googlesyndication**', { statusCode: 200, body: {} });
//   //   cy.intercept('GET', '**doubleclick.net**', { statusCode: 200, body: {} });
//   //   cy.intercept('GET', '**adtrafficquality.google**', { statusCode: 200, body: {} });
    
//   //   cy.visit('https://automationexercise.com');
//   //   cy.get('body', { timeout: 15000 }).should('be.visible');
//   // });

//     // Part 9: Code Organization - Setup Hook
//   beforeEach(() => {
//     // Blocks heavy Google ads and traffic quality trackers from freezing the page load event
//     cy.intercept('GET', '**/pagead/**', { statusCode: 200, body: {} });
//     cy.intercept('GET', '**googlesyndication**', { statusCode: 200, body: {} });
//     cy.intercept('GET', '**/adsbygoogle/**', { statusCode: 200, body: {} });
//     cy.intercept('GET', '**adtrafficquality**', { statusCode: 200, body: {} });
    
//     cy.visit(baseUrl);
//   });


  it('Test Case 1: Verify Homepage Loads', () => {
    cy.get('.logo img').should('be.visible');
    cy.get('.shop-menu').should('be.visible');
    cy.get('a[href="/login"]').should('be.visible');
  });

  it('Test Case 2: Register a New User', () => {
    const email = `student${Date.now()}@test.com`;

    cy.visit('https://automationexercise.com/login');
    cy.get('[data-qa="signup-name"]').type('Test Student');
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click({ force: true });

    cy.get('#id_gender1').check();
    cy.get('[data-qa="password"]').type('StudentPassword123');
    cy.get('[data-qa="days"]').select('10');
    cy.get('[data-qa="months"]').select('June');
    cy.get('[data-qa="years"]').select('2000');

    cy.get('[data-qa="first_name"]').type('Test');
    cy.get('[data-qa="last_name"]').type('Student');
    cy.get('[data-qa="address"]').type('123 School Lane');
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type('California');
    cy.get('[data-qa="city"]').type('Los Angeles');
    cy.get('[data-qa="zipcode"]').type('90001');
    cy.get('[data-qa="mobile_number"]').type('1234567890');

    cy.get('[data-qa="create-account"]').click({ force: true });
    cy.contains('Account Created!', { timeout: 10000 }).should('be.visible');

    cy.get('[data-qa="continue-button"]').click({ force: true });
    
    // FIXED: Enforce home route alignment to bypass post-registration overlay ads
    cy.visit('https://automationexercise.com');
    cy.contains('Logged in as', { timeout: 10000 }).should('be.visible');

    cy.get('a[href="/delete_account"]').click({ force: true });
    cy.get('[data-qa="account-deleted"]', { timeout: 10000 }).should('be.visible');
  });

  it('Test Case 3: Login With Valid Credentials', () => {
    const loginEmail = `login_student${Date.now()}@test.com`;

    cy.visit('https://automationexercise.com/login');
    cy.get('[data-qa="signup-name"]').type('Test Student');
    cy.get('[data-qa="signup-email"]').type(loginEmail);
    cy.get('[data-qa="signup-button"]').click({ force: true });

    cy.get('#id_gender1').check();
    cy.get('[data-qa="password"]').type('StudentPassword123');
    cy.get('[data-qa="first_name"]').type('Test');
    cy.get('[data-qa="last_name"]').type('Student');
    cy.get('[data-qa="address"]').type('123 School Lane');
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type('California');
    cy.get('[data-qa="city"]').type('Los Angeles');
    cy.get('[data-qa="zipcode"]').type('90001');
    cy.get('[data-qa="mobile_number"]').type('1234567890');
    cy.get('[data-qa="create-account"]').click({ force: true });
    
    cy.get('[data-qa="continue-button"]').click({ force: true });
    cy.visit('https://automationexercise.com'); // Stabilizes layout state

    cy.get('a[href="/logout"]').click({ force: true });

    cy.login(loginEmail, 'StudentPassword123');
    cy.contains('Logged in as', { timeout: 10000 }).should('be.visible');

    cy.get('a[href="/logout"]').click({ force: true });
    cy.url().should('include', '/login');
  });

  it('Test Case 4: Login With Invalid Credentials', () => {
    cy.login('invalid_student_user@wrong.com', 'BadPassword999');
    cy.get('.login-form form').should('contain', 'incorrect');
  });

  it('Test Case 5: Search for a Product', () => {
    // FIXED: Direct navigation routing prevents layout-break advertisement windows from injecting
    cy.visit('https://automationexercise.com/products');
    cy.url().should('include', '/products');
    cy.get('#search_product').type('dress');
    cy.get('#submit_search').click();
    cy.get('.title').should('contain', 'Searched Products');
    
    cy.get('.productinfo').first().invoke('text').then((text) => {
      expect(text.toLowerCase()).to.include('dress');
    });
  });

  it('Test Case 6: View Product Details', () => {
    cy.visit('https://automationexercise.com/products');
    cy.get('.choose a').first().click({ force: true });
    cy.get('.product-information h2').should('be.visible');
    cy.get('.product-information p').should('contain', 'Category');
    cy.get('.product-information span span').should('be.visible');
    cy.get('.product-information').should('contain', 'Availability');
    cy.get('.product-information').should('contain', 'Condition');
    cy.get('.product-information').should('contain', 'Brand');
  });

  it('Test Case 7: Add Product to Cart', () => {
    cy.visit('https://automationexercise.com/products');
    cy.get('.productinfo .add-to-cart').first().click({ force: true });
    
    // FIXED: Waiting for visible stability resolves asynchronous framework updates
    cy.get('.modal-body a[href="/view_cart"]').should('be.visible').click({ force: true });
    cy.get('#cart_info_table').should('be.visible');
    cy.get('.cart_quantity').should('be.visible');
    cy.get('.cart_price').should('be.visible');
  });

  it('Test Case 8: Remove Product From Cart', () => {
    cy.visit('https://automationexercise.com/products');
    cy.get('.productinfo .add-to-cart').first().click({ force: true });
    
    // FIXED: Mitigates element tracking loss while modal renders
    cy.get('.modal-body a[href="/view_cart"]').should('be.visible').click({ force: true });
    cy.get('.cart_quantity_delete').click({ force: true });
    cy.get('#empty_cart', { timeout: 10000 }).should('be.visible');
  });

  it('Test Case 9: Submit Contact Us Form', () => {
    cy.visit('https://automationexercise.com');
    cy.get('[data-qa="name"]').type('Test Student');
    cy.get('[data-qa="email"]').type('student@test.com');
    cy.get('[data-qa="subject"]').type('Homework Assignment');
    cy.get('[data-qa="message"]').type('Automated testing script executed successfully.');

    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Press OK to proceed');
      return true;
    });

    cy.get('[data-qa="submit-button"]').click({ force: true });
    cy.get('.status').should('contain', 'Success');
  });

  it('Challenge 1: Add Multiple Products', () => {
    cy.visit('https://automationexercise.com');
    cy.get('.productinfo .add-to-cart').eq(0).click({ force: true });
    cy.get('.close-modal').should('be.visible').click({ force: true });
    cy.get('.productinfo .add-to-cart').eq(1).click({ force: true });
    cy.get('.modal-body a[href="/view_cart"]').should('be.visible').click({ force: true });
    cy.get('#cart_info_table tbody tr').should('have.length.at.least', 2);
  });

  it('Challenge 3: Subscribe to Newsletter', () => {
    cy.get('#footer').scrollIntoView();
    cy.get('#susbscribe_email').type('newsletter_student@test.com');
    cy.get('#subscribe').click({ force: true });
    cy.get('.alert-success').should('be.visible');
  });
});
