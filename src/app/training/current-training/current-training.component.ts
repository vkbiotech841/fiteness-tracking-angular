import { StopTrainingComponent } from './stop-training.component';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer: any;

  @Output() trainingExit = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.startOrResumeTimer();

  }


  startOrResumeTimer() {
    // Start or resume timmer: Increasing progress bar spinner on every 1000 miliseconds by 5
    this.timer = setInterval(() => {
      this.progress = this.progress + 10;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1 * 1000)
  }


  // Stop Timer or resume timer: This stops the spinner progress and also opens a dialog box.
  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    });
  }



}
