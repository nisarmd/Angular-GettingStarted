Observables provide an asynchronous data stream using Angular HTTPClient.

HttpClient is part of Angular package - import { HttpClientModule } from '@angular/common/http';

    The HTTPClient returns Observables as return type.
        Typical request flow diagram
            Service ---->   HttpClient(returns Observable<Item>)  ---->  WebServer(returns Item)

Observables is part of package/library RxJS (Reactive Extentions) - import { Observable } from 'rxjs';
The rxjs library is responsile of composing data using observable sequence.
This is Asynchronous in nature.
Similar to LINQ in .NET.

    Observables Pipe.
        This allows applying operators to an onservable.
        Below are some example of operators as part of Obsservable Pipe.
            Example - tap, map, filter etc.
            - import { map, tap } from 'rxjs/operators';

    Observable contains below notifications when it is subscribed :
    - next // next item is emitted. Gets invoked and provides the next item from stream
    - error // when error has occured
    - complete // when complete

    Declaration :
        Observable are used with an angular HttpClient.

        1. inject HttpClient as a dependency in the service/component. [Refer document  Services & Dependency Injection.]
            - Example:
                constructor(httpClient: HttpClient) {}

        2. With the httpClient, make an http GET call to an api to get the data.
            - Example:
                getItems(): Observable<Item[]> {
                    return this.httpClient.get<Item[]>('http://dummyUrl/api/getItems')
                    // pipe can help acess operators like tap to see the observable stream without changing the observable.
                    // and catchError can help in handling error from the observable.
                    .pipe({
                        tap((data) => JSON.stringify(data)),
                        catchError(this.handleError)
                    });
                }
                // ## Note 1 : The HttpClient will return Observable<Item[]>.
                // ## Note 2 : However the get<T>() method in httpClient expects generics of Item[].
                // ## Note 3 : This API call won't work unless this observable is subscribed.

    using:
        With the above observable, we have to subscribe to make it work.

        1. Initialize a variable for subscription.
            Example
                - sub! = Subscription;
        2. In ngOnInit() method invoke the serice method which returns Observable<Item[]>
            Example
                - ngOnInit(): void {
                    this.sub = this.getItems().subscribe({
                        
                        next: (items) => (this.items = items), // next provides the next item emitted and assigns it to this.items variable.

                        error: (message) => (this.errorMessage = message) // error get invokked when an error message is received and assigns the same to this.errorMessage variable.
                    })
                  }


