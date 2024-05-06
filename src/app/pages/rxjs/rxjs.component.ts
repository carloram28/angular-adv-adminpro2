import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, filter, interval, map, retry, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ``
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;
  constructor() {


    // this.retornarObservable().pipe(
    //   retry(2)
    // ).subscribe({
    //   next: (v) => console.log('Subs:', v),
    //   error: (e) => console.warn(e),
    //   complete: () => console.info('Obs Terminado')
    // });
    this.intervalSubs = this.retornarIntervalo().subscribe(console.log)
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();

  }

  retornarIntervalo(): Observable<number> {
    return interval(100)
      .pipe(
        // take(10),
        map(valor => valor + 1),
        filter(valor => (valor % 2 === 0) ? true : false),
      )

  }

  retornarObservable(): Observable<number> {
    let i = -1
    return new Observable<number>(observer => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          observer.error('i llego al valor de 2')
        }
      }, 1000)
    });

  }


}
