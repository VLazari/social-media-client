// describe("The Page", () => {
//   it("successfully loads", () => {
//     cy.visit("http://127.0.0.1:5500"); // change URL to match your dev URL
//   });
// });

describe("Social Media App - login", () => {
  const validEmail = "testv@noroff.no";
  const validPassword = "testvpass";
  const invalidEmail = "wrong@mail.com";
  const invalidPassword = "wrongpass";
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500");
    cy.clearLocalStorage();
    cy.get("#registerForm .modal-header .btn-close").click().wait(500);
  });
  // it("successfully loads", () => {
  //       cy.visit("http://127.0.0.1:5500");
  //     });

  it("Can not login with wrong email", () => {
    // cy.get('#registerForm .modal-header .btn-close').click()
    // .wait(500)
    cy.get("header").find('button[data-auth="login"]').click({ force: true });
    cy.get("#loginForm").should("be.visible").wait(500);
    cy.get("#loginEmail").clear().type(`${invalidEmail}`);
    cy.get("#loginPassword").type(`${validPassword}`);
    cy.get("#loginForm button").contains("Login").click();
    cy.url().should("not.include", "profile");
  });

  it("Can not login with wrong password", () => {
    // cy.get('#registerForm .modal-header .btn-close').click()
    // .wait(500)
    cy.get("header").find('button[data-auth="login"]').click({ force: true });
    cy.get("#loginForm").should("be.visible").wait(500);
    cy.get("#loginEmail").type(`${validEmail}`);
    cy.get("#loginPassword").type(`${invalidPassword}`);
    cy.get("#loginForm button").contains("Login").click();
    cy.url().should("not.include", "profile");
  });

  //   it('Close register modal', () => {
  //   cy.get('#registerForm .modal-header .btn-close').click()
  //   .wait(500);
  //   .find('button[data-auth="login"]').click();
  // });

  //   it('Open login modal', () => {
  //   cy.get('header').find('[data-auth="login"]').click();
  // });

  // it("test", () =>{
  //   cy.get("#registerForm")
  //     .find("[data-auth='login']").click()
  // })
});

// it('Open login modal', () => {
//   cy.get('header').find('button[data-auth="login"]').click();
// });

// it('Adding login credentials', () => {
//   cy.get('#loginForm')
//     .wait(500)
//     .get('#loginEmail')
//     .clear()
//     .wait(500)
//     .type(`${email}`)
//     .wait(500)
//     .get('#loginPassword')
//     .clear()
//     .type(`${password}`)
//     .wait(500)
//     .get('.modal-footer')
//     .find('button')
//     .contains('Login')
//     .click()
//     .wait(2000)
//     .then(() => expect(window.localStorage.getItem('token')).to.be.null)
//     .then(() => expect(window.localStorage.getItem('profile')).to.be.null);
// });
