import { Component, OnInit } from '@angular/core';

// 1) Importa dependências
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {

  // 3) Atributos
  item: Observable<any[]>;

  constructor(

    // 2) Injeta dependências
    firestore: AngularFirestore
  ) {

    // 4) Ler dados do banco de dados
    this.item = firestore.collection('articles').valueChanges({ idField: 'id' });
  }

  ngOnInit() { }
}
