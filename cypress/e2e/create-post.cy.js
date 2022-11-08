Cypress.Commands.add("login", () => {
  cy.get("#registerForm .modal-header .btn-close").click().wait(500);
  cy.get("header").find('button[data-auth="login"]').click({ force: true });
  cy.get("#loginForm").should("be.visible").wait(500);
  cy.get("#loginEmail").type(`testv@noroff.no`);
  cy.get("#loginPassword").type(`testvpass`);
  cy.get("#loginForm button").contains("Login").click();
});

describe("Social Media App - login", () => {
  const postTitle = "e2e test post";
  const postTag = "test-tag";
  const postMedia =
    "https://i.picsum.photos/id/30/1280/901.jpg?hmac=A_hpFyEavMBB7Dsmmp53kPXKmatwM05MUDatlWSgATE";
  const postBody = "e2e test body";
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://127.0.0.1:5500");
    cy.login();
    cy.wait(500);
  });

  it("Can not create post without post title", () => {
    cy.get("#footerActions > .btn-outline-success").click();
    cy.get("#postTags").clear().type(`${postTag}`);
    cy.get("#postMedia").clear().type(`${postMedia}`);
    cy.get("#postBody").clear().type(`${postBody}`);
    cy.get('[data-action="publish"]').click();
    cy.get("#postForm").then(
      ($form) => expect($form[0].checkValidity()).to.be.false
    );
  });

  it("Can not create post with invalid post Media", () => {
    cy.get("#footerActions > .btn-outline-success").click();
    cy.get("#postTitle").clear().type(`${postTitle}`);
    cy.get("#postTags").clear().type(`${postTag}`);
    cy.get("#postMedia").clear().type(`invalidurl`);
    cy.get("#postBody").clear().type(`${postBody}`);
    cy.get('[data-action="publish"]').click();
    cy.get("#postForm").then(
      ($form) => expect($form[0].checkValidity()).to.be.false
    );
  });

  it("Can create post with valid credential and delete it", () => {
    cy.get("#footerActions > .btn-outline-success").click();
    cy.get("#postTitle").clear().type(`${postTitle}`);
    cy.get("#postTags").clear().type(`${postTag}`);
    cy.get("#postMedia").clear().type(`${postMedia}`);
    cy.get("#postBody").clear().type(`${postBody}`);
    cy.get('[data-action="publish"]').click();
    cy.get("#nav-default").should("be.visible");
    cy.get("#nav-default b").should("be.visible").contains(postTitle);
    cy.get('#nav-default [data-action="delete"]').click();
  });
});
