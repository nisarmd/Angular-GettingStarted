This document talks about importance of services in Angular apps and how to inject those services using DI pattern.

1. Services & Dependency Injection
    
    a.  Services -
        provides reusable module of code seperated out of component.
        Example: Making an API call to get list of product.

        These services can then be injected to the respective compnents.

    b.  Dependency Injection - A pattern/technique to remove tight coupling between lower level modules from upper level modules. 
        Provides loose coupling and testability.

        Service can be accessible at rooj injector level or compoent.ts level.
        Below are the examples on declaring and using - 

        * GLOBAL/ROOT accessible.

           i.  Declaring - This will make the service injectable from any component.ts. Hence making it global.
                            This uses RootInjector of Angular.

                    Decorate a service class with @Injectable()
                    Example:-
                        @Injectable({providedIn: 'root'})
                            This will make the service class injectable at root level, which means all the components.ts can inject the same

            ii. Using -

                    In component.ts constructor , add an argv for Service for injecting
                    Example:-
                        constructor(someService: SomeService){}
                            Access this service using this.someService.

        ** SCOPED

            i.  Declaring - This will make the service injectable for specific component.ts and its child components. Hence making it scoped.

                    Inside the @Component({}) decorator in component.ts file, add a property named "providers" and set the value as shown below. 
                    Example:-
                        @Component( { providers: [ SomeService ] } )
                            This will make the service class injectable for the specific component in which it is declared. Hence making the service private to this component.ts.

            ii. Using -

                    In component.ts constructor , add an argv for Service for injecting
                    Example:-
                        constructor(someService: SomeService){}
                            Access this service using this.someService.

            ## ABSRACTION WITH MULTIPLE SERVICES AND INJECTING THEM - ApiCallService vs FlatFileService [Design and Implementation]

                    i.  Declaration/Creation
                        
                        # Create an interface as below.

                            - IService
                                Declare an abstract method getIems().

                        ## Create the following classes

                            - ApiCallService
                                - Decorate this with @Injectable()
                                    // Implement the abstract method getIems() from IService eg. the implementation of getIems() in ApiCallService will get files from network using http protocol.

                            - FlatFileService 
                                - Decorate this with @Injectable()
                                    // Implement the abstract method getIems() from IService eg. the implementation of getIems() in FlatFileService will get files from hardcoded files.

                        ### Inside the @Component({}) decorator in component.ts file, add a property named "providers" and set the value as shown below.

                                Example:-

                                    @Component( { providers: [ { provide: 'IService', useClass: ApiCallService } ] } )
                                        - This will inject a specific service using IService absraction.
                                        - This will make the service class injectable for the specific component in which it is declared 


                    ii. Using -

                            In component.ts constructor , add an argv for Service for injecting
                            Example:-
                                constructor(@Inject('IService') someService: IService){}
                                    Access this service using this.someService.

