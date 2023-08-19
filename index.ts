import { interval, ReplaySubject } from 'rxjs';
import { take, multicast, tap, mapTo } from 'rxjs/operators';

// https://www.learnrxjs.io/learn-rxjs/operators/multicasting/multicast

// Example 2: multicast with ReplaySubject
//emit every 2 seconds, take 5
const srcInterval = interval(2000).pipe(take(5));

//example with ReplaySubject
const example = srcInterval.pipe(
  //since we are multicasting below, side effects will be executed once
  tap((_) => console.log('Side Effect #2')),
  mapTo('Result Two!')
);
//can use any type of subject
const multi = example.pipe(multicast(() => new ReplaySubject(5)));
//subscribe subject to source
multi.connect();

setTimeout(() => {
  /*
   subscriber will receieve all previous values on subscription because
   of ReplaySubject
   */
  const subscriber = multi.subscribe((val) => console.group(val));
}, 5000);
