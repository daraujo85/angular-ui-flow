import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './card/card.component';
import CardModel from './card/models/card.model';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, MatIconModule, CardComponent, FormsModule],
})
export class AppComponent {
  title = 'angular-ui-flow';
  isSidebarOpen = false;
  isDragging: boolean = false;
  //Options
  crmOptions: string[] = ['XPTO', 'CRMA', 'CRMC'];
  functionOptions: string[] = ['Classificação','Conversação','Extração','Resumo',];
  notificationOptions: string[] = ['E-mail', 'Whatsapp', 'Slack'];
  storageOptions: string[] = ['AWS', 'Azure', 'Dropbox', 'Google Drive', 'GCP'];

  //Configs
  crmConfigs: { [key: string]: any }[] = [
    { Email: 'diegoaraujo@devesync.com.br' },
    { Token: 'b65e179ac6d8bf5eb1ad4d9b0e2c936e7514a88f9456455c7c' },
    { BaseUrl: 'https://api.devesync.com.br' },
  ];

  wpConfigs: { [key: string]: any }[] = [
    { AccountSid: 'flamengo2019' },
    { AuthToken: 'garagemdocodigo' },
  ];

  storageConfigs: { [key: string]: any }[] = [
    { StorageAccountName: 'stlisamedia' },
    { StorageAccountKey: 'Flalalalalaly+YbYPoxtVyhxAxYs9QdvP+lT2Ae+A12312==' },
    { StorageContainerName:'dev' },
    { StorageQueryKey: 'dev' }
  ];

  //Cards
  componentA: CardModel = new CardModel(
    'FUNÇÃO',
    'Extração',
    this.functionOptions,
    ['Mensagem'],
    ['Nome', 'Email'],
    this.crmConfigs,
    '',
    '#BA2525',
    '360px',
    '320px'
  );
  componentB: CardModel = new CardModel(
    'FUNÇÃO',
    'Conversação',
    this.functionOptions,
    ['Mensagem'],
    ['Acionar equipe'],
    this.crmConfigs,
    '',
    '#BA2525',
    '360px',
    '170px'
  );
  componentC: CardModel = new CardModel(
    'FUNÇÃO',
    'Classificação',
    this.functionOptions,
    ['Mensagens'],
    ['Classificação'],
    this.crmConfigs,
    '',
    '#BA2525',
    '360px',
    '20px'
  );
  componentD: CardModel = new CardModel(
    'FUNÇÃO',
    'Resumo',
    this.functionOptions,
    ['Mensagens'],
    ['Resumo'],
    this.crmConfigs,
    '',
    '#BA2525',
    '60px',
    '505px'
  );
  componentE: CardModel = new CardModel(
    'CRM',
    'C2S',
    this.crmOptions,
    ['Criar Lead', 'Criar Mensagem'],
    ['Obter ID do Lead'],
    this.crmConfigs,
    '',
    '#377549',
    '60px',
    '320px'
  );
  componentF: CardModel = new CardModel(
    'ARMAZENAMENTO DE ARQUIVOS',
    'Azure',
    this.storageOptions,
    ['Carregar Arquivo'],
    ['Obter Link'],
    this.storageConfigs,
    '',
    '#3075A1',
    '60px',
    '170px'
  );
  componentG: CardModel = new CardModel(
    'NOTIFICAÇÃO',
    'Whatsapp',
    this.notificationOptions,
    ['Mensagem'],
    ['Confirmação'],
    this.wpConfigs,
    '',
    'rgb(43 43 43)',
    '60px',
    '20px'
  );

  currentCard: CardModel | null = null;
  formData: any = {};

  createDynamicForm(card: CardModel) {
    this.formData = {}; // Limpa os dados do formulário anterior

    // Cria campos de formulário dinamicamente com base nas configurações do card
    card.configs.forEach((config) => {
      Object.keys(config).forEach((key) => {
        // Verifica se a chave é diferente de 'type' para evitar campos com tipo
        if (key !== 'type') {
          // Define os valores padrão dos inputs
          this.formData[key] = config[key];
        }
      });
    });
  }
  onSubmit() {
    // Aqui você pode usar os dados do formulário submetido (this.formData) conforme necessário
    console.log(`Formulário (${this.currentCard?.type} | ${this.currentCard?.title}) submetido:`, this.formData);
  }
  handleCardClick(card: CardModel) {
    this.currentCard = card;
    this.createDynamicForm(card);
    this.isSidebarOpen = true;
  }

  toggleSidebar() {
    if (!this.currentCard) {
      return;
    }
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
