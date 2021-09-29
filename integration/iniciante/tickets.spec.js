describe('Tickets', () => {
  beforeEach(() =>
    cy.visit(
      'https://ticketbox-backstopjs-tat.s3.eu-central-1.amazonaws.com/index.html',
    ),
  );

  it('fills all the text input fields', () => {
    const firstName = 'Renato';
    const lastName = 'Oliveira';

    cy.get('#first-name').type(firstName);
    cy.get('#last-name').type(lastName);
    cy.get('#email').type('renato@teste.com');
    cy.get('#requests').type("It's");
    cy.get('#signature').type(`${lastName} ${firstName}`);
  });

  it('select two tickets', () => {
    cy.get('#ticket-quantity').select('2');
  });

  it("select 'vip' ticket type", () => {
    cy.get('#vip').check();
  });

  it("selects 'social media' checkbox", () => {
    cy.get('#social-media').check();
  });

  it("selects 'friend', and 'publication', then uncheck 'friend'", () => {
    cy.get('#friend').check();
    cy.get('#publication').check();
    cy.get('#friend').uncheck();
  });

  it("has 'TICKETBOX' header's heading", () => {
    cy.get('header h1').should('contain', 'TICKETBOX');
  });

  it('alerts on invalid email', () => {
    cy.get('#email').as('email').type('dasda-.com');

    cy.get('#email.invalid').should('exist');

    cy.get('@email').clear().type('teste@gmail.com');

    cy.get('#email.invalid').should('not.exist');
  });

  it('fills and reset the forms', () => {
    const firstName = 'Renato';
    const lastName = 'Oliveira';
    const fullName = `${firstName} ${lastName}`;

    cy.get('#first-name').type(firstName);
    cy.get('#last-name').type(lastName);
    cy.get('#email').type('renato@teste.com');
    cy.get('#ticket-quantity').select('2');
    cy.get('#vip').check();
    cy.get('#publication').check();
    cy.get('#requests').type('IPA beer');

    cy.get('.agreement p').should(
      'contain',
      `I, ${fullName}, wish to buy 2 VIP tickets.`,
    );

    cy.get('#agree').click();
    cy.get('#signature').type(fullName);

    cy.get("button[type='submit']")
      .as('submitButton')
      .should('not.be.disabled');

    cy.get("button[type='reset']").click();

    cy.get('@submitButton').should('be.disabled');
  });

  it('fills mandatory fields uding support command', () => {
    const customer = {
      firstName: 'Lucas',
      lastName: 'Cerazza',
      email: 'lucas@teste.com',
    };

    cy.fillMandatoryFields(customer);

    cy.get("button[type='submit']")
      .as('submitButton')
      .should('not.be.disabled');

    cy.get('#agree').uncheck();

    cy.get('@submitButton').should('be.disabled');
  });
});
