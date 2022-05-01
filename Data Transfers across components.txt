This document talks about Data transfer across components.

Nested components are used for sending data for the following purposes:

1. master component to child component using @Input()

    i.  inline annotate field in child component.ts  with @Input()

    ii. use property binging in master components - child selector's element.
        a. Here within the element use property name as child field name which is annotated with @Input()
        b. value should be from master component.s
        <child [childField]='masterField' ></child>

        Furthermore: An @Input() can be used along with Angular hook - onChange to detect any changes ehich will invoke ngOnChange() method.

2. child component to master component using @Output()

    i.  define an event emitter and assign the same to a field in child component.ts. Also annotate the same with @Output().
        @Output() childEventEmitterField: EventEmitter<string> = EventEmitter<string>();

    ii. for any change/event in child DOM, associate the DOM element with an event binding function in child component.ts.
        <div (click)='onClick()' > {{name}}
        </div>
        And in that function onClick() defined in child component.ts, invoke the event emitter field.
            ex: onClick() {
                this.childEventEmitterField.emit('Some mesasage to be passed to master');
            }
    
    iii. In the child element selector present in master component.html, use event binding where event name is the fiel name defie in child compopnent.ts i.e. childEventEmitterField
         And assign it to a function declared in master component.ts

         <child (childEventEmitterField)='onEventFromChild($event)' ></child>
         
    iv.  define a function in master component.ts named onEventFromChild which taskes an argv to processs the argv in master component.ts.
         In master component.ts
         onEventFromChild(message: string) {
             this.valueFromChildToMasterParam = message;
         }