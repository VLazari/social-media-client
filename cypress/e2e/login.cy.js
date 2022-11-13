describe("Social Media App - login", () => {
  const validEmail = "testv@noroff.no";
  const validPassword = "testvpass";
  const invalidEmail = "wrong@mail.com";
  const invalidPassword = "wrongpass";
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
    cy.wait(500);
    cy.get("#registerForm .modal-header .btn-close").click().wait(500);
  });

  it("Can not login with wrong email", () => {
    cy.get("header").find('button[data-auth="login"]').click({ force: true });
    cy.get("#loginForm").should("be.visible").wait(500);
    cy.get("#loginEmail").type(`${invalidEmail}`);
    cy.get("#loginPassword").type(`${validPassword}`);
    cy.get("#loginForm button").contains("Login").click();
    cy.url().should("not.include", "profile");
  });

  it("Can not login with wrong password", () => {
    cy.get("header").find('button[data-auth="login"]').click({ force: true });
    cy.get("#loginForm").should("be.visible").wait(500);
    cy.get("#loginEmail").type(`${validEmail}`);
    cy.get("#loginPassword").type(`${invalidPassword}`);
    cy.get("#loginForm button").contains("Login").click();
    cy.url().should("not.include", "profile");
  });

  it("Can login with valid email and password", () => {
    cy.get("header").find('button[data-auth="login"]').click({ force: true });
    cy.get("#loginForm").should("be.visible").wait(500);
    cy.get("#loginEmail").type(`${validEmail}`);
    cy.get("#loginPassword").type(`${validPassword}`);
    cy.get("#loginForm button").contains("Login").click();
    cy.wait(500);
    cy.url().should("include", "profile");
  });
});
