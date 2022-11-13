Cypress.Commands.add("login", () => {
  cy.get("#registerForm .modal-footer")
    .find("button")
    .contains("Login")
    .click();
  cy.wait(500);
  cy.get("#loginForm").find("#loginEmail").type(`testv@noroff.no`);
  cy.wait(500);
  cy.get("#loginForm #loginPassword").type(`testvpass`);
  cy.wait(500);
  cy.get("#loginForm button").contains("Login").click();
});

describe("Social Media App - logout", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(500);
    cy.clearLocalStorage();
    cy.login();
    cy.wait(500);
  });

  it("Logout user", () => {
    cy.get("header").find('[data-auth="logout"]').click();
    cy.get("#registerForm").should("be.visible");
  });
});
