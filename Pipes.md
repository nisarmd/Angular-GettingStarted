Angular Pipes provide a customisation in DOM.

    1. There are many pipes available by default.
        Example:
             - json|date|uppercase|lowercase|currency

            Usecase:
            - <div> {{ personName | uppercase }} </div>
            - <div> {{ salary | currency: 'INR' : 'symbol' : '1-2.2' }} </div> // Here currency pipe can take parameters/argv like 'country_currency_code' : 'symbol_should     display_or_not' : 'max_numer supported - min_decimal.max_decimal'

    2. Custom Pipes
        One can write their owin pipes.

        Example:

            -  @Pipe({
                  name: 'spacePipe' // name of the pipe
               })
               export class SpacePipe implememts PipeTransform {

                private spaceChar: string = ' ';

                // Overriden function from PipeTransform interface
                transform(value: string, character string): string {
                    return value.replace(character, spaceChar);
                }
              }

        Use:
            - - <div> {{ personCode | spacePipe: '-' }} </div>

