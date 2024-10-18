import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewRef, Output, EventEmitter, Inject, ChangeDetectorRef, Renderer2, ElementRef, ViewContainerRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: []
  
})
export class AddItemDialogComponent implements OnInit {
 
  

  newItemName = '';
  @Output() closeDialog = new EventEmitter<void>();
  @Output() itemAdded = new EventEmitter<string>();
  

  
    constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private viewRef: ChangeDetectorRef,
  ) 
  {}

  ngOnInit(): void {
    
   
    // this.blurBackground();
  }
  ngAfterViewInit() {
    
    //this.blurBackground();   //this has been commented out because it actually causes dupes
    // Trigger change detection manually after the view is initialized
    this.viewRef.markForCheck();
    this.viewRef.detectChanges(); 

  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnterKey(event: KeyboardEvent) {
    event.preventDefault(); // Prevent form submission
    this.addItem();
    }
  
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    event.preventDefault(); // Prevent form submission
    this.closePopup();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.closePopup();
    }
  }
onItemAdded(item: string) {
 
 
}


  blurBackground() {
    // Create a dark overlay element
    const overlay = this.renderer.createElement('div');
    this.renderer.addClass(overlay, 'overlay');
    this.renderer.appendChild(document.body, overlay); 

    // Add a class to the dialog container for styling
    this.renderer.addClass(this.el.nativeElement, 'dialog-container'); 


  }

  addItem() {
    // Emit an event to notify the parent component when an item is added
    
    this.itemAdded.emit(this.newItemName);
    this.closePopup();
  }

  closePopup() {
    this.viewRef.markForCheck();
    this.viewRef.detectChanges(); 
    this.closeDialog.emit();
    console.log("closePopup(): entering");
    // Remove the overlay when the dialog closes
    const overlay = document.querySelector('.overlay');
    if (overlay) {
      
      this.renderer.removeChild(document.body, overlay);
      this.renderer.removeClass(this.el.nativeElement, 'dialog-container'); 
    }
  }   
}