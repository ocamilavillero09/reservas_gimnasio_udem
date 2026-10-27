import { Ability } from '@serenity-js/core';
import { Db, MongoClient } from 'mongodb';

/**
 * Habilidad de consultar y preparar la base de datos de pruebas.
 *
 * La API solo deja reservar para mañana, pero RF11, RF12 y RF13 trabajan con
 * las reservas de HOY: el actor las siembra directamente, como hacen las
 * pruebas de Cypress (cy.task('db:insertarReserva')). También la usa para
 * comprobar el efecto de una acción en la base, no solo lo que se ve en pantalla.
 */
export class ConsultarLaBaseDeDatos extends Ability {
  private cliente?: MongoClient;

  static en(uri: string, nombre: string) {
    return new ConsultarLaBaseDeDatos(uri, nombre);
  }

  constructor(private readonly uri: string, private readonly nombre: string) {
    super();
  }

  async db(): Promise<Db> {
    if (!this.cliente) {
      this.cliente = new MongoClient(this.uri);
      await this.cliente.connect();
    }
    return this.cliente.db(this.nombre);
  }

  async cerrar(): Promise<void> {
    await this.cliente?.close();
    this.cliente = undefined;
  }
}
