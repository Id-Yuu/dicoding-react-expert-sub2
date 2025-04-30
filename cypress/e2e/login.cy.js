describe('Login spec', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    cy.get('legend').should('contain', 'Login');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Login');
  });

  it('should display error when email and password are empty', () => {
    cy.get('button[type="submit"]').click();

    cy.get('input[type="email"]:invalid').should('exist');
    cy.get('input[type="password"]:invalid').should('exist');
  });

  it('should display error when email is invalid', () => {
    cy.get('input[type="email"]').type('invalid-email');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.get('input[type="email"]:invalid').should('exist');
  });

  it('should successfully login with valid credentials', () => {
    cy.get('input[type="email"]').type('user@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Verify successful login (adjust based on your app behavior)
    cy.url().should('not.include', '/login');
  });

  // Error Testing
  // Error Testing
  // Error Testing

  it('should display error when using wrong credentials', () => {
  // Fill form with invalid credentials
    cy.get('input[type="email"]').type('wrong@email.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Verify error message appears
    cy.on('window:alert', (message) => {
      expect(message).to.be.oneOf(['Email or password is wrong', 'Connection error']);
    });
  });

  it('should display error when server is unreachable', () => {
  // Intercept login API call and force network error
    cy.intercept('POST', '**/login', {
      forceNetworkError: true
    }).as('loginError');

    // Attempt login
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Verify network error message
    cy.on('window:alert', (message) => {
      expect(message).to.equal('Failed to fetch');
    });
  });

  it('should handle API validation errors', () => {
  // Intercept login API call and return validation error
    cy.intercept('POST', '**/login', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: 'Invalid email format'
      }
    }).as('loginValidationError');

    // Attempt login
    cy.get('input[type="email"]').type('invalid@email');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Verify validation error message
    cy.on('window:alert', (message) => {
      expect(message).to.equal('Invalid email format');
    });
  });
});