import { Component, OnInit } from '@angular/core';
import {CodeModal} from './modals/codeModal';
import {NotebookService} from './notebook.service';
import {ResultModal} from './modals/resultModal';
import {faArrowRight, faTerminal, faEquals, faTrashAlt, faCogs} from '@fortawesome/free-solid-svg-icons';
import {CodeResultModal} from './modals/codeResultModal';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent implements OnInit {
  codeObj: CodeModal;
  result: ResultModal;
  codeResults: CodeResultModal[] = [];
  faArrowRight = faArrowRight;
  faTerminal = faTerminal;
  faEquals = faEquals;
  faTrashAlt = faTrashAlt
  faCogs = faCogs;
  constructor(private notebookService: NotebookService) { }

  ngOnInit() {
  }

  reset(): void {
    this.codeResults = [];
  }

  execute(code: string): void {
    this.codeObj = new CodeModal(code);
    this.notebookService.execute(this.codeObj).subscribe(res => {
      this.result = res;
      this.codeResults.push(new CodeResultModal(code.substring(8), res.result));
    });
    console.log(this.codeObj.code);
  }

}
