describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register');
  });

  it('should display register page correctly', () => {
    cy.get('input[type="text"]').should('exist');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Register');
  });

  it('should display error when form is submitted empty', () => {
    cy.get('button[type="submit"]').click();

    cy.get('input[type="text"]:invalid').should('exist');
    cy.get('input[type="email"]:invalid').should('exist');
    cy.get('input[type="password"]:invalid').should('exist');
  });

  it('should display error when email format is invalid', () => {
    cy.get('input[type="text"]').type('Test User');
    cy.get('input[type="email"]').type('invalid-email');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.get('input[type="email"]:invalid').should('exist');
  });

  it('should successfully register with valid data', () => {
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    cy.get('input[type="text"]').type(testUser.name);
    cy.get('input[type="email"]').type(testUser.email);
    cy.get('input[type="password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();

    // Verify successful registration (adjust based on your app behavior)
    cy.url().should('not.include', '/register');
  });

  it('should display error when email is already registered', () => {
    // Intercept register API call
    cy.intercept('POST', '**/register', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: 'Email is already taken'
      }
    }).as('registerError');

    cy.get('input[type="text"]').type('Test User');
    cy.get('input[type="email"]').type('existing@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (message) => {
      expect(message).to.be.oneOf([
        'Email is already taken',
        'Connection error'
      ]);
    });
  });

  it('should display error when server is unreachable', () => {
    cy.intercept('POST', '**/register', {
      forceNetworkError: true
    }).as('networkError');

    cy.get('input[type="text"]').type('Test User');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (message) => {
      expect(message).to.equal('Connection error');
    });
  });
});