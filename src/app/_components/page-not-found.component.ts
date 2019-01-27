import { Component } from "@angular/core";

@Component({
    selector: 'page-not-found',
    template: `
    <div class="row">
        <div id="pagenf-icon" class="col-md-1">
            <mat-icon>error</mat-icon>
        </div>
        <div id="pagenf" class="col-md-8">
            <h3>Page Not Found</h3>
        </div>
    </div>
    `,
    styles: [`
    div{
        width: 50%;
        align-items: center;
        display: flex;
        margin-top: 20px;
    }
    #pagenf{
        justify-content: left;
    }
    `]
})

export class PageNotFoundComponent { }