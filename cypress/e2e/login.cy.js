describe("The Page", () => {
  it("successfully loads", () => {
    cy.visit("http://127.0.0.1:5500"); // change URL to match your dev URL
  });
});

// describe("Social Media App", () => {
//   beforeEach(() => {
//     cy.visit('http://127.0.0.1:5500');
//   })

//   it("test", () =>{
//     cy.get(header);
//       // .find("[data-auth='register']").click()
//   })
// })
