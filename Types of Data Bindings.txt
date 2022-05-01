Data Bindings:

Interpolation 
    DOM <-- COMPONENT
    {{ productName }}

Property Bindings
    DOM <-- COMPONENT
    <img [src]='productImage' />

Event Bindings
    DOM --> COMPONENT
    <img (click)='toggleImage()' />

Two Way Bindings
    DOM <--> COMPONENT
    <input [(ngModel)]='personName' />