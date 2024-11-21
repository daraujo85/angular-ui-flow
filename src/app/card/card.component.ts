import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import CardModel from './models/card.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @ViewChild('card') cardElement: ElementRef<any> | undefined;
  @Input() model!: CardModel;
  @Output() cardClicked: EventEmitter<CardModel> =
    new EventEmitter<CardModel>();
  startX: number = 0;
  startY: number = 0;
  offsetX: number = 0;
  offsetY: number = 0;
  dragging: boolean = false;
  showSettings: boolean = false;

  ngAfterViewInit() {
    if (
      this.model.initialLeft &&
      this.model.initialTop &&
      this.cardElement &&
      this.cardElement.nativeElement
    ) {
      this.cardElement.nativeElement.style.left = this.model.initialLeft;
      this.cardElement.nativeElement.style.top = this.model.initialTop;
    }
    // Verifica se há uma posição salva no localStorage para este card
    const savedPosition = localStorage.getItem(
      `card_${this.model.title}_position`
    );
    if (savedPosition) {
      const [left, top] = savedPosition.split(',');
      if (this.cardElement) {
        this.cardElement.nativeElement.style.left = left;
        this.cardElement.nativeElement.style.top = top;
      }
    }
  }

  onMouseDown(event: MouseEvent | TouchEvent) {
    // Calcula a posição inicial do mouse em relação ao card
    const rect = this.cardElement?.nativeElement.getBoundingClientRect();
    if (event instanceof MouseEvent) {
      this.startX = event.clientX - (rect?.left ?? 0);
      this.startY = event.clientY - (rect?.top ?? 0);
    } else if (event instanceof TouchEvent && event.touches.length === 1) {
      this.startX = event.touches[0].clientX - (rect?.left ?? 0);
      this.startY = event.touches[0].clientY - (rect?.top ?? 0);
    }
    this.dragging = true;
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onMouseMove(event: MouseEvent | TouchEvent) {
    if (this.dragging && this.cardElement && this.cardElement.nativeElement) {
      // Verificar se cardElement e seu nativeElement não são nulos
      let clientX = 0;
      let clientY = 0;
      if (event instanceof MouseEvent) {
        clientX = event.clientX;
        clientY = event.clientY;
      } else if (event instanceof TouchEvent && event.touches.length === 1) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      }
      const deltaX = clientX - this.startX;
      const deltaY = clientY - this.startY;
      this.cardElement.nativeElement.style.left = this.offsetX + deltaX + 'px';
      this.cardElement.nativeElement.style.top = this.offsetY + deltaY + 'px';
      localStorage.setItem(
        `card_${this.model.title}_position`,
        `${this.cardElement.nativeElement.style.left},${this.cardElement.nativeElement.style.top}`
      );
    }
  }

  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  onMouseUp() {
    this.dragging = false;
  }

  toggleSettings() {
    this.showSettings = !this.showSettings;
  }

  onCardClick() {
    this.cardClicked.emit(this.model);
  }
  onSelect(event: any) {
    const selectedValue = event.target?.value; // Use a operação de acesso opcional (?)
    if (selectedValue) {
      this.model.title = selectedValue;
    }
  }
}
