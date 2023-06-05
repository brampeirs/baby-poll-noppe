import { Component, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from 'src/app/components/button/button.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { PollService } from 'src/app/services/poll.service';
import { PollPostDto } from 'src/app/services/poll.model';
import { take } from 'rxjs';

@Component({
  selector: 'bp-poll',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(25px)' }),
        animate(250),
      ]),
    ]),
  ],
})
export class PollComponent implements OnInit, OnDestroy {
  pollService = inject(PollService);
  router = inject(Router);
  navigateForward() {
    if (this.currentStep === 5) {
      if (this.form.valid) {
        const poll: PollPostDto = this.form.value as unknown as PollPostDto;
        this.isSubmitting = true;
        this.pollService
          .postPoll(poll)
          .pipe(take(1))
          .subscribe(() => this.router.navigate(['./']));
      }
    } else {
      this.currentStep = this.currentStep + 1;
    }
  }
  private renderer = inject(Renderer2);
  weight = 2.5;
  currentStep = 0;
  showAll = false;
  isSubmitting = false;
  constructor(private formBuilder: FormBuilder) {}

  form = this.formBuilder.group({
    participant: this.formBuilder.control<string | undefined>(undefined, [
      Validators.required,
    ]),
    relation: this.formBuilder.control<Date | undefined>(undefined, [
      Validators.required,
    ]),
    gender: this.formBuilder.control<string | undefined>(undefined, [
      Validators.required,
    ]),
    name: this.formBuilder.control<string | undefined>(undefined, [
      Validators.required,
    ]),
    date: this.formBuilder.control<undefined | string>('2023-09-15', [
      Validators.required,
    ]),
    weight: this.formBuilder.control<number | undefined>(2.4),
  });

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'white-background');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'white-background');
  }

  navigateBack() {
    if (this.currentStep === 0) {
      this.router.navigate(['/']);
    } else {
      this.currentStep = this.currentStep - 1;
    }
  }

  get isDisabled() {
    switch (this.currentStep) {
      case 0:
        return this.form.get('participant')?.invalid;
        break;
      case 1:
        return this.form.get('relation')?.invalid;
        break;
      case 2:
        return this.form.get('gender')?.invalid;
        break;
      case 3:
        return this.form.get('name')?.invalid;
        break;
      case 4:
        return this.form.get('date')?.invalid;
        break;
      case 5:
        return this.form.get('weight')?.invalid || this.isSubmitting;
        break;
      default:
        return false;
      // code block
    }
  }
}
