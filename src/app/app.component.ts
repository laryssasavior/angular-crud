import { Component } from "@angular/core";
import { ListaComponent } from "./lista/lista.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

}
  