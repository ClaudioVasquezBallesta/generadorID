import { Injectable } from '@angular/core';

//Importamos los modulos para DB con Firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IdGenerator } from "./id-generator.model";

//Importamos nuestro modelo
@Injectable({
  providedIn: 'root'
})

export class IdGeneratorService {

  constructor(private angularFirestore: AngularFirestore) { }

  //metodos para el CRUD

  getIdGenerated() {
    return this.angularFirestore
      .collection("participantes")
      .snapshotChanges()
  }
  getIdGeneratedById(id) {
    return this.angularFirestore
      .collection("participantes")
      .doc(id)
      .valueChanges()
  }
  createIdGenerated(participantes: IdGenerator) {

    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection("participantes")
        .add(participantes)
        .then((response) => {
          console.log("Creado");
        },
          (error) => {
            reject(error);
          });
    })

  }

  updateIdGenerated(participantes: IdGenerator, id) {
    return this.angularFirestore
      .collection("participantes")
      .doc(id)
      .update({
        id_generado: participantes.id_generado
      });
  }

  deleteIdGenerated(participantes) {
    return this.angularFirestore
    .collection("participantes")
    .doc(participantes.id)
    .delete();
  }
}
