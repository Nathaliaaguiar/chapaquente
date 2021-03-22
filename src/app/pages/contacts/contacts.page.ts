import { Component, OnInit } from '@angular/core';

// 1) Importa dependências
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  // 3) Criar atributos
  contactForm: FormGroup;
  pipe = new DatePipe('en_US');

  constructor(

    // 2) Injeta dependências
    private afs: AngularFirestore,
    public form: FormBuilder

  ) { }

  ngOnInit() {

    // Construir formulário
    this.contactFormCreate();
  }

  // Constrói o formulário
  contactFormCreate() {

    // Campos do formulário
    this.contactForm = this.form.group({

      date: [''],
      name: [ // Nome do campo
        '', // Valor inicial
        Validators.compose([ // Cria uma validação
          Validators.required, // Obrigatório
          Validators.minLength(3) // Pelo menos 3 caracteres
        ])
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],
      subject: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ],
      message: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ]
    });
  }

  // Processa envio do formulário
  contactSend() {

    // Formata data
    this.contactForm.controls.date.setValue(this.pipe.transform(Date.now(), 'yyyy-MM-dd hh:mm:ss').trim());

    // Salva documento no Firestore
    this.afs.collection('contacts').add(this.contactForm.value).then(() => {

      // Exibe feedback
      alert("Contato enviado com sucesso!");

      // Reinicia formulário
      this.contactForm.reset({
        date: '',
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Em caso de erro, gera log
    }).catch((error) => { console.error(error); });
  }

}
