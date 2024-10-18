
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit, ViewContainerRef, ViewRef } from '@angular/core';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';

import { CommonModule } from '@angular/common';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogContainer, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogRef } from '@angular/cdk/dialog';



@Component({
  selector: 'app-complex-box',
  standalone: true,
  imports: [AddItemDialogComponent, CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './complex-box.component.html',
  styleUrl: './complex-box.component.css',
  providers: [ {
    provide: MatDialogRef,
    useValue: {}
  }, ]
})
export class ComplexBoxComponent implements OnInit {
  @Input() showAddItemDialog: boolean = false;


  private _items = new BehaviorSubject<string[]>(["item1", "item2", "item3"]);
  items$ = this._items.asObservable();
  selectedItems: string[] = [];
  items: string[] = [];  

  constructor(
    private viewRef: ChangeDetectorRef, 
    public dialog: MatDialog, 
    public dialogRef: MatDialogRef<DialogComponent>, 
    @Inject(ViewContainerRef) 
    public viewContainerRef: ViewContainerRef) 
    {
    this.items$.subscribe(items => this.items = items);
    // console.log("constructor(): items: " + this.items);
    // console.log("constructor(): selectedItems: " + this.selectedItems);
    // console.log("constructor(): showAddItemDialog: " + this.showAddItemDialog);
  }

  ngOnInit() {
    // console.log("ngOnInit(): items: " + this.items);
    // console.log("ngOnInit(): selectedItems: " + this.selectedItems);
    // this.selectedItems=["item1"];
    // this.viewRef.detectChanges();
    // console.log("ngOnInit() after changed: selectedItems: " + this.selectedItems);
    // console.log("ngOnInit(): showAddItemDialog: " + this.showAddItemDialog);
  }


  addItemDialogClosed()
{
  this.showAddItemDialog = false;
  //this.items.push($event);
}

  onItemAdded($event: string) {
    this._items.next([...this._items.value, $event]);
  }

  

  toggleAddItemDialog() {
    console.log("flipping showAddItemDialog: " + this.showAddItemDialog);
    this.showAddItemDialog = !this.showAddItemDialog;
    console.log("new value showAddItemDialog: "+ this.showAddItemDialog);
  }
  
  addItem() {
  }

  removeItem() {
    if (this.selectedItems[0] == undefined)
      {
            if (this.selectedItems.length === 0) {
      this.openDialog("Please select an item to remove.", "Remove Button");
      return;
    }

        return;
      }
    console.log("this.selectedItems[0]: " + this.selectedItems);
    this._items.next(this._items.value.filter((i: string) => i !== this.selectedItems[0]));
    this.selectedItems = [];
  }

  clearSelectedItems() {
    this.selectedItems = [];
  }

  onItemSelected(item: string) {
    
    this.draggedItemIndex = this._items.value.indexOf(item); // Set draggedItemIndex when an item is selected
    this.selectedItems = [item]; // Only allow one item to be selected at a time
  }



  isSpinning = false;
  draggedItemIndex: number | undefined; // To track selected item index
  //selectedItems: string[] = []; 
  moveItemUp() {
    if (this.selectedItems[0] == undefined)
      {
            if (this.selectedItems.length === 0) {
      this.openDialog("Please select an item to move up.", "Up Button");
      return;
    }

        return;
      }
    
        this.isSpinning = true;
      setTimeout(() => {
        this.moveItem(-1); 
        this.isSpinning = false;
      }, 10); 
      
  }
  moveItemDown() {
    if (this.selectedItems[0] == undefined)
      {
            if (this.selectedItems.length === 0) {
      this.openDialog("Please select an item to move down.", "Down Button");
      return;
    }

        return;
      }
    this.isSpinning = true;
    setTimeout(() => {
      this.moveItem(1);
      this.isSpinning = false;
    }, 10);
  }
  moveItem(direction: number) {
    if (this.selectedItems[0] && this.draggedItemIndex != undefined) {
      const currentItems = this._items.value;
      const currentIndex = currentItems.indexOf(this.selectedItems[0]);
      const newIndex = currentIndex + direction;
      if (newIndex >= 0 && newIndex < currentItems.length) {
        moveItemInArray(currentItems, currentIndex, newIndex);
        this._items.next(currentItems); 
        this.selectedItems = [currentItems[newIndex]];
      }
    }
  }

  openDialog(msg: string, title?: string): MatDialogRef<DialogComponent> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: title || "Information",
        msg: msg
       },
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '200ms',
      autoFocus: true,
      panelClass: 'custom-dialog-container',
      
      backdropClass: 'custom-dialog-backdrop',
      hasBackdrop: true,
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    return dialogRef;
  }
  closeDialog()
  {
    this.dialogRef.close();
  }
}


