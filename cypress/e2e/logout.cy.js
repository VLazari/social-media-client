Cypress.Commands.add("login", () => {
  cy.get("#registerForm .modal-header .btn-close").click().wait(500);
  cy.get("header").find('button[data-auth="login"]').click({ force: true });
  cy.get("#loginForm").should("be.visible").wait(500);
  cy.get("#loginEmail").type(`testv@noroff.no`);
  cy.get("#loginPassword").type(`testvpass`);
  cy.get("#loginForm button").contains("Login").click();
});

describe("Social Media App - login", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://127.0.0.1:5500");
    cy.login();
    cy.wait(500);
  });

  it("Logout user", () => {
    cy.get("header").find('[data-auth="logout"]').click();
    cy.get("#registerForm").should("be.visible");
  });
});
