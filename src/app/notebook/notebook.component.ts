import { Component, OnInit } from '@angular/core';
import { CodeModal } from './modals/codeModal';
import { NotebookService } from './notebook.service';
import { ResultModal } from './modals/resultModal';
import {
  faTerminal,
  faTrashAlt,
  faCogs,
  faAngleDoubleRight,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { CodeResultModal } from './modals/codeResultModal';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent implements OnInit {
  codeObj: CodeModal;
  result: ResultModal;
  codeResults: CodeResultModal[] = [];
  faTerminal = faTerminal;
  faTrashAlt = faTrashAlt;
  faCogs = faCogs;
  faAngleDoubleRight = faAngleDoubleRight;
  faExclamationTriangle = faExclamationTriangle;
  alert = 'alert-primary';
  showSpinner = false;
  errors = false;
  constructor(private notebookService: NotebookService) { }

  ngOnInit() { }

  reset(): void {
    this.codeResults = [];
  }

  /**
   * execute python code
   * @param code
   */
  execute(code: string): void {
    const pythonInterpreter = '%python ';
    if (code) {
      this.errors = false;
      const instruction = pythonInterpreter + code;
      this.codeObj = new CodeModal(instruction);
      this.showSpinner = true;
      this.notebookService.execute(this.codeObj).subscribe(
        res => {
          this.result = res;
          this.alert = 'alert-primary';
          this.codeResults.push(
            new CodeResultModal(instruction.substring(8), res.result)
          );
          this.showSpinner = false;
        },
        error => {
          this.alert = 'alert-danger';
          this.codeResults.push(
            new CodeResultModal(
              instruction.substring(8),
              error.error.message.toString()
            )
          );
          this.showSpinner = false;
        }
      );
    } else {
      this.errors = true;
    }
  }
}
