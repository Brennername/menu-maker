import { Component, ElementRef, HostListener, Input, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { DashboardComponent } from '../../forms/dashboard/dashboard.component';

@Component({
  selector: 'app-window-container',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './window-container.component.html',
  styleUrl: './window-container.component.css'
})
export class WindowContainerComponent {
  @Input() title = '';
  @Input() content: Type<any> = DashboardComponent;
  @Input() isVisible = false;
    
  @ViewChild('windowHeader', { static: true }) windowHeader!: ElementRef;
  
  @ViewChild('windowContainer', { static: true }) windowContainer!: ElementRef;
  @ViewChild('resizeHandle', { static: true }) resizeHandle!: ElementRef;
  @ViewChild('windowContent', { read: ViewContainerRef }) windowContent!: ViewContainerRef;

  private isResizing = false;
  private initialX = 0;
  private initialY = 0;
  private initialWidth = 0;
  private initialHeight = 0;

  constructor(private windowService: WindowService) {}
  createComponent() {
    
    this.windowContent.clear();
    
    // Access component instance properties or methods:
    const componentInstance = this.windowContent.createComponent(this.content).instance;
    //console.log("componentInstance: " + componentInstance);
    
  } 
  setContent(component: Type<any>)
  {
    
    this.content = component;
  }
 
  @HostListener('document:mousedown', ['$event'])
  onResizeStart(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.id === 'window-resize-handle') {
      this.isResizing = true;
      this.initialX = event.clientX;
      this.initialY = event.clientY;
      this.initialWidth = this.windowContainer.nativeElement.offsetWidth;
      this.initialHeight = this.windowContainer.nativeElement.offsetHeight;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onResize(event: MouseEvent) {
      if (this.isResizing) {
          const width = this.initialWidth + (event.clientX - this.initialX);
          const height = this.initialHeight + (event.clientY - this.initialY);
          this.windowContainer.nativeElement.style.width = width + 'px';
          this.windowContainer.nativeElement.style.height = height + 'px';
      }
  }

  @HostListener('document:mouseup')
  onResizeEnd() {
      this.isResizing = false;
  }

  ngOnInit() {
    console.log("windowService: " + this.windowService);
    this.windowService.windowData$.subscribe((data: { isVisible: boolean; title: string; content: Type<any>; }) => {
      this.isVisible = data.isVisible;
      this.title = data.title;
      this.content = data.content;
      this.createComponent();
      
    });
    console.log("ngOnInit(): got here 1");
    console.log("isVisible: " + this.isVisible);
    console.log("title: " + this.title);
    console.log("content: " + this.content.name);
    }
    private isDragging = false;
  private initialMouseX = 0;
  private initialMouseY = 0;
  private initialWindowX = 0;
  private initialWindowY = 0;

  @HostListener('mousedown', ['$event'])
  onDragStart(event: MouseEvent) {
    if (event.target === this.windowHeader.nativeElement) {
      this.isDragging = true;
      this.initialMouseX = event.clientX;
      this.initialMouseY = event.clientY;
      this.initialWindowX = this.windowContainer.nativeElement.offsetLeft - 25;
      this.initialWindowY = this.windowContainer.nativeElement.offsetTop - 25;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onDrag(event: MouseEvent) {
    if (this.isDragging) {
      const deltaX = event.clientX - this.initialMouseX;
      const deltaY = event.clientY - this.initialMouseY;
      this.windowContainer.nativeElement.style.left =
        this.initialWindowX + deltaX + 'px';
      this.windowContainer.nativeElement.style.top =
        this.initialWindowY + deltaY + 'px';
    }
  }

  @HostListener('document:mouseup')
  onDragEnd() {
    this.isDragging = false;
  }

  
 showWindow()
 {
  console.log("window-container.showWindow(): I don't expect this to be called");
 } 
  closeWindow() {
 
    this.windowService.closeWindow(this.content);
  }
}