import { Component, Injectable, Type } from '@angular/core';
    import { Subject } from 'rxjs';
    @Injectable({
      providedIn: 'root'
    })
    export class WindowService {
      private windowDataSubject = new Subject<{ isVisible: boolean; title: string; content: Type<Component>; }>();
      windowData$ = this.windowDataSubject.asObservable();
      showComponent(content: Type<Component>){
        this.windowDataSubject.next({ 
          isVisible: true, 
          title: content.name.substring(1).replace('Component', ''), 
          content: content });   
      }
      showWindow(title: string, content: Type<Component>) {
       console.log("Entering showWindow(" + title + ", " + content.name + " )");
       this.windowData$.subscribe(data => console.log(data.isVisible));
        this.windowDataSubject.next({ isVisible: true, title: title, content: content });
      }
      closeWindow(target: Type<any>) {
        this.windowDataSubject.next({ isVisible: false, title: '', content: target });
      }
    }