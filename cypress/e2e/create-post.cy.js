Cypress.Commands.add("login", () => {
  cy.get("#registerForm button").contains("Login").click();
  cy.wait(500);
  cy.get("#loginForm").find("#loginEmail").type(`testv@noroff.no`);
  cy.wait(500);
  cy.get("#loginForm").find("#loginPassword").type(`testvpass`);
  cy.wait(500);
  cy.get("#loginForm button").contains("Login").click();
});

describe("Social Media App - create post", () => {
  const postTitle = "e2e test post";
  const postTag = "test-tag";
  const postMedia =
    "https://i.picsum.photos/id/30/1280/901.jpg?hmac=A_hpFyEavMBB7Dsmmp53kPXKmatwM05MUDatlWSgATE";
  const postBody = "e2e test body";
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
    cy.wait(500);
    cy.login();
    cy.wait(500);
  });

  it("Can not create post without post title", () => {
    cy.get("#footerActions > .btn-outline-success").click();
    cy.wait(1000);
    cy.get("#postForm").find("#postTitle").clear().type(`${postTag}`);
    cy.wait(500);
    cy.get("#postMedia").clear().type(`${postMedia}`);
    cy.wait(500);
    cy.get("#postBody").clear().type(`${postBody}`);
    cy.wait(500);
    cy.get('[data-action="publish"]').click();
    cy.get("#postForm").then(
      ($form) => expect($form[0].checkValidity()).to.be.false
    );
  });

  it("Can not create post with invalid post Media", () => {
    cy.get("#footerActions > .btn-outline-success").click();
    cy.wait(1000);
    cy.get("#postTitle").clear().type(`${postTitle}`);
    cy.wait(500);
    cy.get("#postTags").clear().type(`${postTag}`);
    cy.wait(500);
    cy.get("#postMedia").clear().type(`invalidurl`);
    cy.wait(500);
    cy.get("#postBody").clear().type(`${postBody}`);
    cy.wait(500);
    cy.get('[data-action="publish"]').click();
    cy.get("#postForm").then(
      ($form) => expect($form[0].checkValidity()).to.be.false
    );
  });

  it("Can create post with valid credential and delete it", () => {
    cy.get("#footerActions > .btn-outline-success").click();
    cy.wait(1000);
    cy.get("#postTitle").clear().type(`${postTitle}`);
    cy.wait(500);
    cy.get("#postTags").clear().type(`${postTag}`);
    cy.wait(500);
    cy.get("#postMedia").clear().type(`${postMedia}`);
    cy.wait(500);
    cy.get("#postBody").clear().type(`${postBody}`);
    cy.wait(500);
    cy.get('[data-action="publish"]').click();
    cy.get("#nav-default").should("be.visible");
    cy.get("#nav-default b").should("be.visible").contains(postTitle);
    cy.get('#nav-default [data-action="delete"]').click();
  });
});
