import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appFontSize]',
  standalone: false
})
export class FontSizeDirective implements OnInit {

  constructor(private element: ElementRef<HTMLElement>) { }
  ngOnInit(): void {
    this.element.nativeElement.style.fontSize = '20px';
  }
}
