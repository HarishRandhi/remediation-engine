import { Component, VERSION } from '@angular/core';

interface SelectorModel {
  id: number;
  value: string;
  identifier?: string;
}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  selector: number = 1;
  selectorValue: string = '';
  property: number = 1;
  propertyValue: string = '';
  sourceElement: number = 0;
  titleValue = '';
  pageLanguage = '';
  // elementValue:string ='';
  elementTypes: SelectorModel[] = [
    { value: 'Select', id: 0 },
    { value: 'Image', id: 1 },
    { value: 'Title', id: 2 },
    { value: 'Language', id: 3 }
  ];
  selectors: SelectorModel[] = [
    { value: 'By Id', id: 1, identifier: 'getElementById' },
    { value: 'By Tag', id: 2, identifier: 'getElementByTag' },
    { value: 'By Class', id: 3, identifier: 'getElementByClass' }
  ];

  properties: SelectorModel[] = [
    { value: 'alt', id: 1 },
    { value: 'value', id: 2 },
    { value: 'others', id: 3 }
  ];
  code: string;

  generateCode() {
    if (this.sourceElement === 1) {
      var jsString = `
    //this for js code or file
    document.${this.selectors.find(s => s.id === this.selector).identifier}("${
        this.selectorValue
      }"").${this.properties.find(p => p.id === this.property).value} = "${
        this.propertyValue
      }"
    `;

      var jqString = `
    // this for jQuery code or file
    \$("#${this.selectorValue}").${
        this.properties.find(p => p.id === this.property).value
      } = "${this.propertyValue}"`;

      this.code = jsString + jqString;
    } else if (this.sourceElement === 2) {
      var script = `
      var titleChild=document.createElement('title');
      titleChild.innerHTML="${this.titleValue}";
      document.getElementsByTagName('head')[0].appendChild(titleChild);`;
      this.code = script;
    } else if (this.sourceElement === 3) {
      var script = `
      var htmlTag=document.querySelector("html");
      htmlTag.setAttribute("lang","${this.pageLanguage}");`;
      this.code = script;
    }
  }

  copyCode() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.code;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  clear() {
    this.code = '';
    this.selectorValue = '';
    this.propertyValue = '';
  }
  elementSelectChange(e) {
    console.log(e, this.sourceElement);
    this.clear();
  }
}
