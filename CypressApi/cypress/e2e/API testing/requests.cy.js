describe("API testing", () => {
  it("Get call", () => {
    cy.request("GET", "https://automationexercise.com/api/productsList")
      .its("status")
      .should("equal", 200);
  });

  it("Ui testing", () => {
    cy.visit("https://www.automationexercise.com/");
    cy.get('a[href="/products"]').click();
  });

  it.only("Post call", () => {
    cy.request({
      method: "POST",
      url: "https://automationexercise.com/api/productsList",
      form: true,

      body: {
        id: 1,
        name: "Blue Top",
        price: "Rs. 500",
        brand: "Polo",
        userType: "Women",
        category: "Tops",
      },
    }).then((response) => {
      cy.log(JSON.stringify(response));
      console.log(response);
      expect(response.status).to.equal(200);
      expect(response.body).to.exist;
      expect(response.body).to.include("This request method is not supported.");
    });
  });

  it("Post - to verify user login", () => {
    cy.request({
      method: "POST",
      url: "https://automationexercise.com/api/verifyLogin",
      form: true,

      body: {
        password: "Test123",
      },
      //failonStatuscode: false,
    }).then((response) => {
      cy.log(JSON.stringify(response));
      console.log(response);
      expect(response.status).to.equal(200);
      expect(response.body).to.exist;
      expect(response.body).to.include(
        "Bad request, email or password parameter is missing in POST request."
      );
    });
  });
});
