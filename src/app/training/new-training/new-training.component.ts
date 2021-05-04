import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {



  exercises: Exercise[] = [];

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.getExercises();
  }

  getExercises() {
    this.exercises = this.trainingService.getAvailableExercises();
  };

  onStartTraining(form: NgForm) {
    console.log("new excercise form", form.value);
    this.trainingService.startExercise(form.value.exercise);
  };

}
