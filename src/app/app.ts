import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('Le futur bébé');

  protected remainingTime = signal<Date | null>(null);

  protected remainingHoursSeconde = computed(() =>
    this.remainingTime()?.toISOString().slice(11, 19),
  );

  protected isTimePassed = signal<boolean>(false);

  private eventTime = new Date(2026, 3, 18, 14, 0, 0, 0);

  ngOnInit(): void {
    timer(0, 1000).subscribe(() => {
      const remainingTime = this.eventTime.getTime() - new Date().getTime();

      if (remainingTime < 0) {
        this.isTimePassed.set(true);
      } else {
        this.isTimePassed.set(false);
      }

      this.remainingTime.set(new Date(remainingTime));
    });
  }
}
