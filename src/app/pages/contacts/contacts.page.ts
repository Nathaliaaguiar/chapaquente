
import { Component, OnInit } from '@angular/core';

// 1) Importa dependÃªncias
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

// Alert Controller
import { AlertController } from '@ionic/angular';

// 6) NÃ£o permite somente espaÃ§os nos campos
export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  // 3) Atributos
  public contactForm: FormGroup; // ContÃ©m o formulÃ¡rio de contatos
  public pipe = new DatePipe('en_US'); // Formatar as datas

  constructor(
    // 2) Injeta dependÃªncias
    public form: FormBuilder,
    public firestore: AngularFirestore,

    // Alert Controller
    public alert: AlertController
  ) { }

  ngOnInit() {
    // 4) Cria o formulÃ¡rio de contatos
    this.contactFormCreate();
  }

  // 5) Cria o formulÃ¡rio de contatos
  contactFormCreate() {

    // 'contactForm' contÃ©m o formulÃ¡rio
    // Um formulÃ¡rio Ã© um 'agrupamento' (group) de campos...
    this.contactForm = this.form.group({

      // Data de envio estÃ¡ vazia
      date: [''],

      // Campo 'Nome' (name)
      name: [
        '', // Valor inicial
        Validators.compose([ // ValidaÃ§Ã£o do campo
          Validators.required, // ObrigatÃ³rio
          Validators.minLength(3), // Pelo menos 3 caracteres
          removeSpaces // NÃ£o permite somente espaÃ§os
        ]),
      ],

      // Campo 'E-mail' (email)
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email, // Valida somente se for um e-mail vÃ¡lido
          removeSpaces
        ]),
      ],

      // Campo 'Assunto' (subject)
      subject: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          removeSpaces
        ]),
      ],
      message: [
        // Mensagem
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          removeSpaces
        ]),
      ],
    });
  }

  // 7) Processa o envio do formulÃ¡rio]
  contactSend() {

    // Cria e formata a data
    this.contactForm.controls.date.setValue(
      this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss').trim()
    );

    // Salva em um novo documento do Firebase Firestore
    this.firestore.collection('contacts').add(this.contactForm.value)
      .then(
        () => {

          // Feedback
          this.presentAlert();
        }
      )
      .catch(

        // Exibe erro se nÃ£o salvar
        (error) => {
          alert('Erro ao salvar contato.' + error);
        }
      );
  }

  // Feedback
  // Exibe feedback
  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Oba!',
      message: 'Contato enviado com sucesso!',
      buttons: [{
        text: 'Ok',
        handler: () => {
          
          // Reset do formulÃ¡rio
          this.contactForm.reset();
        }
      }]
    });

    await alert.present();
  }
}
