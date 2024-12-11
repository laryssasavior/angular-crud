import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  @ViewChild('myModal') model: ElementRef | undefined;
  clientObj: Cliente = new Cliente();
  clientList: Cliente[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem("angularCrud");
    if(localData != null) {
      this.clientList = JSON.parse(localData)
    }
  }

  openModel() {    
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  closeModel() {
    this.clientObj = new Cliente();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  onDelete(item: Cliente) {
    const isDelet = confirm("Você tem certeza que quer deletar?");
    if(isDelet) {
      const currentRecord =  this.clientList.findIndex(m=> m.id === this.clientObj.id);
      this.clientList.splice(currentRecord,1);
      localStorage.setItem('angularCrud', JSON.stringify(this.clientList));
    }
  }
  onEdit(item: Cliente) {
    this.clientObj =  item;
    this.openModel();
  }

  update() {
      const currentRecord =  this.clientList.find(m=> m.id === this.clientObj.id);
      if(currentRecord != undefined) {
        currentRecord.name = this.clientObj.name;
        currentRecord.address =  this.clientObj.address;
        currentRecord.mobileNo =  this.clientObj.mobileNo;
      };
      localStorage.setItem('angularCrud', JSON.stringify(this.clientList));
      this.closeModel()
  }

  save() {
    debugger;
    const isLocalPresent = localStorage.getItem("angularCrud");
    if (isLocalPresent != null) {
      
      const oldArray = JSON.parse(isLocalPresent);
      this.clientObj.id = oldArray.length + 1;
      oldArray.push(this.clientObj);
      this.clientList = oldArray;
      localStorage.setItem('angularCrud', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.clientObj);
      this.clientObj.id = 1;
      this.clientList = newArr;
      localStorage.setItem('angularCrud', JSON.stringify(newArr));
    }
    this.closeModel()
  }
}


export class Cliente {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor() {
    this.id = 0;
    this.address = '';
    this.city = '';
    this.email = '';
    this.mobileNo = '';
    this.name = '';
    this.state = '';
    this.pincode = '';
  }

}