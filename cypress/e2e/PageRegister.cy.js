describe('Page Register', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register', {
      failOnStatusCode: false,
      retryOnNetworkFailure: true,
      timeout: 30000
    }).then(() => {
      // Wait for React to finish rendering
      cy.get('.hero').should('be.visible');
    });
  });

  it('should display register page elements correctly', () => {
    // Add retry options and better selectors
    cy.get('input#name[type="text"]', { timeout: 10000 }).should('exist');
    cy.get('input#email[type="email"]').should('exist');
    cy.get('input#password[type="password"]').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Register');

    cy.get('p').should('contain', 'Already have an account?');
    cy.get('a.link').should('contain', 'Login').and('have.attr', 'href', '/login');
  });

  it('should navigate to login page when clicking login link', () => {
    cy.get('a.link').click();
    cy.url().should('include', '/login');
  });

  it('should handle successful registration', () => {
    // Intercept API call
    cy.intercept('POST', '**/register', {
      statusCode: 201,
      body: {
        status: 'success',
        data: { user: { id: 'user-123' } }
      }
    }).as('registerRequest');

    // Fill and submit form
    cy.get('input[type="text"]').type('Test User');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Assert navigation after successful registration
    cy.wait('@registerRequest');
    cy.url().should('include', '/login');
  });

  it('should handle registration with existing email', () => {
    // Intercept API call with error
    cy.intercept('POST', '**/register', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: 'Email is already taken'
      }
    }).as('registerFailure');

    // Fill and submit form
    cy.get('input[type="text"]').type('Test User');
    cy.get('input[type="email"]').type('existing@example.com');
    cy.get('input[type="password"]').type('password123');

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    // Assert we stay on register page
    cy.get('button[type="submit"]').click();
    cy.wait('@registerFailure').then(() => {
      cy.get('@alertStub').should('have.been.calledWith', 'Email is already taken');
    });
  });

  it('should handle network error', () => {
    // Force network error
    cy.intercept('POST', '**/register', {
      forceNetworkError: true
    }).as('networkError');

    // Fill and submit form
    cy.get('input[type="text"]').type('Test User');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    cy.get('button[type="submit"]').click();

    // Assert we stay on register page
    cy.wait('@networkError').then(() => {
      cy.get('@alertStub').should('have.been.calledWith', 'Failed to fetch');
    });
  });
});