describe('Page Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login', {
      failOnStatusCode: false,
      retryOnNetworkFailure: true,
      timeout: 30000
    });
  });

  it('should display login page elements correctly', () => {
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Login');

    // Check registration link
    cy.get('p').should('contain', "Don't have an account?");
    cy.get('a.link').should('contain', 'Register').and('have.attr', 'href', '/register');
  });

  it('should navigate to register page when clicking register link', () => {
    cy.get('a.link').click();
    cy.url().should('include', '/register');
  });

  it('should handle successful login', () => {
    // Intercept API call
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        status: 'success',
        data: { token: 'fake-token' }
      }
    }).as('loginRequest');

    // Fill and submit form
    cy.get('input[type="email"]').type('user@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Assert navigation and token storage
    cy.wait('@loginRequest');
    cy.url().should('eq', 'http://localhost:5173/');
    cy.window().its('localStorage.accessToken').should('exist');
  });

  it('should handle login failure', () => {
    // Intercept failed API call
    cy.intercept('POST', '**/login', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: 'Invalid email or password'
      }
    }).as('loginFailure');

    // Stub window.alert
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    // Fill and submit form
    cy.get('input[type="email"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Assert we stay on login page
    cy.wait('@loginFailure').then(() => {
      cy.get('@alertStub').should('have.been.calledWith', 'Invalid email or password');
    });
  });

  it('should handle network error', () => {
    // Force network error
    cy.intercept('POST', '**/login', {
      forceNetworkError: true
    }).as('networkError');

    // Stub window.alert
    cy.on('window:alert', (message) => {
      expect(message).to.equal('Failed to fetch');
    });

    // Fill and submit form
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Assert we stay on login page
    cy.wait('@networkError').then(() => {
      cy.location('pathname').should('equal', '/login');
    });
  });
});