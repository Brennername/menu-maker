import { Component, ElementRef, HostListener, Input, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { DashboardComponent } from '../../forms/dashboard/dashboard.component';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-window-container',
  standalone: true,
  imports: [DashboardComponent, DragDropModule ],
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
  @ViewChild(CdkDrag) dragRef!: CdkDrag;
  @ViewChild('windowHeader') windowDragHandle!: CdkDrag<any>;
  private isResizing = false;
  private initialX = 0;
  private initialY = 0;
  private initialWidth = 0;
  private initialHeight = 0;
  dragPosition = {x: 0, y: 0};  
  ngOnInit() {
    
    console.log("windowService: " + this.windowService);
    this.windowService.windowData$.subscribe((data: { isVisible: boolean; title: string; content: Type<any>; }) => {
      this.isVisible = data.isVisible;
      this.title = data.title;
      this.content = data.content;
      this.createComponent();
      
    });
    this.windowService.windowData$.subscribe(data => {
      if (data.isVisible) {
       
        setTimeout(() => {
        //this is janky, but works  
        this.centerDiv("data.isVisible, onTimeout"); // Call the centerDiv() function here
      }, 0);
      }
    });
    console.log("ngOnInit(): got here 1");
    console.log("isVisible: " + this.isVisible);
    console.log("title: " + this.title);
    console.log("content: " + this.content.name);
    }
    ngAfterViewInit()
    {
      console.log("ngAfterViewInit(): got here 1");
      
      // setTimeout(() => {
      //   this.centerDiv("ngAfterViewInit");
      // }, 0);
      

    }
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

  
 
 
 /*
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
  @HostListener('dragstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (event.target === this.windowHeader.nativeElement) {
      this.isDragging = true;
      this.initialMouseX = event.touches[0].clientX;
      this.initialMouseY = event.touches[0].clientY;
      this.initialWindowX = this.windowContainer.nativeElement.offsetLeft - 25;
      this.initialWindowY = this.windowContainer.nativeElement.offsetTop - 25;
    }
   
  }


  @HostListener('dragend', ['$event'])
  onTouchEnd() {
    this.isDragging = false;
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
*/
@HostListener('window:dragend', ['$event'])
onDragEnd() {
  console.log("onDragEnd(): innerWidth: " + window.innerWidth + " innerHeight: " + window.innerHeight + " windowContainer.nativeElement.offsetWidth: " + this.windowContainer.nativeElement.offsetWidth + " windowContainer.nativeElement.offsetHeight: " + this.windowContainer.nativeElement.offsetHeight);

  console.log("dragPosition: x:" + this.dragPosition.x + " y: " + this.dragPosition.x);
  // Reset drag position to center if dragging is outside the viewport
  if (this.dragPosition.x < 0 || this.dragPosition.y < 0 ||
      this.dragPosition.x > window.innerWidth - this.windowContainer.nativeElement.offsetWidth ||
      this.dragPosition.y > window.innerHeight - this.windowContainer.nativeElement.offsetHeight) {
        this.centerDiv("onDragEnd()");
  }
}

@HostListener('window:resize', ['$event'])
onWindowResize() {
  this.centerDiv("window:resize");
}


resetPosition() {
  this.dragPosition = {x: 0, y: 0};
}




public centerDiv(debugMsg?: string) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const divWidth = this.windowContainer.nativeElement.offsetWidth;
  const divHeight = this.windowContainer.nativeElement.offsetHeight;

  this.dragPosition = {
    x: (((viewportWidth) / 2)-(divWidth/2)),
    y: (((viewportHeight) /2)-(divHeight/2))
  };
  if (debugMsg) {
    console.log("centerDiv(): " + debugMsg);
  }
  console.log("dragPosition: x:" + this.dragPosition.x + " y: " + this.dragPosition.x);
  console.log("width: " + divWidth);
  console.log("height: " + divHeight);
}







 showWindow()
 {
  console.log("window-container.showWindow(): I don't expect this to be called");
 } 
  closeWindow() {
 
    this.windowService.closeWindow(this.content);
  }
}