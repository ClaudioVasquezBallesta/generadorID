import { Component, OnInit } from '@angular/core';

//Importamos el modelo
import { IdGenerator } from "src/app/id-generator.model";

//Importamos el servicio
import { IdGeneratorService } from "src/app/id-generator.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public lista_id_generados: Array<number> = [];
  public newId: number = 0;
  public Participantes: IdGenerator[];
  private newParticipante: IdGenerator;
  public status: boolean = true;

  constructor(private idGeneratorService: IdGeneratorService){}

  ngOnInit(): void {
    this.idGeneratorService.getIdGenerated().subscribe((res) => {
      this.Participantes = res.map((e) => {
        return {
          ...(e.payload.doc.data() as IdGenerator)
        }
      });
    });
  }

  getRandomArbitrary(min:number, max:number) {
    this.newId = Math.trunc(Math.random() * (max - min) + min);

    if (this.Participantes.some(e => e.id_generado === this.newId)) {
      console.log("El ID ya existe");
      this.status = false;
    }else {
      this.newParticipante = {
        "id_generado": this.newId
      }
      this.idGeneratorService.createIdGenerated(this.newParticipante);
      this.status = true;
    }


    // if (this.lista_id_generados.includes(this.newId)) {

    //   this.getRandomArbitrary(1,100);
    // }else {
    //   this.lista_id_generados.push(this.newId);
    //   this.newParticipante = {
    //     "id_generado": this.newId
    //   }
    // }

  }


}
