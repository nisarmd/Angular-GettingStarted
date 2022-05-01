import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from "@angular/core";

@Component({
    selector:'star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {

    // Nisar notes
    // this hook gets trigered everytime there is changes in @Input() data.
    // example : the master component sends diffrent this.rating for diffrent products.
    ngOnChanges(changes: SimpleChanges): void {
        this.cropWidth = this.rating * 75/5;
    }

    // Nisar notes 
    // To get data from master component
    // Can be used with ngOnChange hook optionally if multiple data expected in this field.
    @Input() rating: number = 0;
    cropWidth: number = 75;

    onClick = () => {
        // console.log();
        this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
    }

    // Nisar notes
    // To emitt changes from child component to master component 
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();
}