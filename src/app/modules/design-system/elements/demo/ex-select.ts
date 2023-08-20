export const  ExSelect = {
    html: `
    <!-- OutLine -->
    <div style="width: 300px; margin-top: 12px;">
      <ng-select [items]="items"  class="form-select-control form-selection-sm"  bindLabel="name"  bindValue="id" >
      </ng-select>
    </div>
    <!-- Solid -->
    <div  style="width: 300px; margin-top: 12px;">
      <ng-select [items]="items"  class="form-select-control form-selection-sm form-control-solid"  bindLabel="name"  bindValue="id" >
      </ng-select>
    </div>
    `,
    css: ``,
    js: `

    // in Module
    import { NgSelectModule } from '@ng-select/ng-select';

    // in component
    items = [ {id: 1, name: 'New item'}, {id: 2, name: 'New item1'}];
    `
}