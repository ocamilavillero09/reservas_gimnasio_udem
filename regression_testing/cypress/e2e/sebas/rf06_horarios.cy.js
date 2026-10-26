describe('RF06 - Consultar horarios y cupos', () => {
  const apiUrl = Cypress.env('apiUrl') || 'http://localhost:8000/api';

  let horarios;

  beforeEach(() => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/slots/`,
      failOnStatusCode: false,
    }).then((respuesta) => {
      expect(respuesta.status, 'Código HTTP').to.eq(200);
      expect(respuesta.body.slots, 'Lista de horarios').to.be.an('array');
      horarios = respuesta.body.slots;
    });
  });

  it('RF06_C1 - No devuelve horarios fuera del catálogo', () => {
    const idsPermitidos = [1, 2, 3, 4, 5, 6];

    horarios.forEach((horario) => {
      expect(
        idsPermitidos,
        `El horario ${horario.id} debe pertenecer al catálogo`
      ).to.include(Number(horario.id));
    });
  });

  it('RF06_C2 - Devuelve seis horarios con cupos y aforo válidos', () => {
    expect(horarios, 'Cantidad de horarios').to.have.length(6);

    horarios.forEach((horario) => {
      expect(horario.available, `Cupos del horario ${horario.id}`)
        .to.be.a('number')
        .and.to.be.at.least(0);

      expect(horario.total, `Aforo del horario ${horario.id}`)
        .to.be.a('number')
        .and.to.be.greaterThan(0);

      expect(horario.available, `Cupos no superan aforo en ${horario.id}`)
        .to.be.at.most(horario.total);
    });
  });
});
