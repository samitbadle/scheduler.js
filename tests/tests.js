function getBaseDate() {
  return new Date(2013, 11, 6, 5, 59, 21, 0); //Friday 2013-Dec-6 05-59-21, Day=5
}
var millisPerDay = 86400000;

test( "RunDate should not round minute to the next 5 minute interval", function() {
  var r = new Schedule.RunDate(new Date(2013, 11, 6, 6, 0, 0, 0));
  var n = r.toDate();
  var expected = new Date(2013, 11, 6, 6, 0, 0, 0);
  deepEqual( n, expected );
});

test( "RunDate should truncate seconds and milliseconds", function() {
  var r = new Schedule.RunDate(new Date(2013, 11, 6, 6, 0, 21, 108));
  var n = r.toDate();
  var expected = new Date(2013, 11, 6, 6, 0, 0, 0);
  deepEqual( n, expected );
});

test( "RunDate should round minute to the next 5 minute interval", function() {
  var r = new Schedule.RunDate(getBaseDate());
  var n = r.toDate();
  var expected = new Date(2013, 11, 6, 6, 0, 0, 0);
  deepEqual( n, expected );
});

test( "RunDate should compare dates correctly", function() {
  var r = new Schedule.RunDate(getBaseDate());

  var expected = getBaseDate();
  equal(r.equals(expected), true, expected );

  expected = new Date(2013, 11, 6, 6, 0, 0, 0);
  equal(r.equals(expected), true, expected );

  expected = new Date(2013, 11, 6, 6, 0, 5, 600);
  equal(r.equals(expected), true, expected );

  expected = new Date(2013, 11, 6, 6, 1, 0, 0);
  equal(r.equals(expected), false, expected );

});

test( "RunDate should increase min by 1", function() {
  var r = new Schedule.RunDate(getBaseDate());
  r.add(1);
  var n = r.toDate();
  var expected = new Date(2013, 11, 6, 6, 5, 0, 0);
  deepEqual( n, expected );
});

test( "RunDate should increase min by 2", function() {
  var r = new Schedule.RunDate(getBaseDate());
  r.add(2);
  var n = r.toDate();
  var expected = new Date(2013, 11, 6, 6, 10, 0, 0);
  deepEqual( n, expected );
});

test( "RunDate should increase hour", function() {
  var r = new Schedule.RunDate(getBaseDate());
  r.nextHour();
  var n = r.toDate();
  var expected = new Date(2013, 11, 6, 7, 0, 0, 0);
  deepEqual( n, expected );
});

test( "RunDate should increase hour twice", function() {
  var r = new Schedule.RunDate(getBaseDate());
  r.nextHour();
  r.nextHour();
  var n = r.toDate();
  var expected = new Date(2013, 11, 6, 8, 0, 0, 0);
  deepEqual( n, expected );
});

test( "RunDate should increase day", function() {
  var r = new Schedule.RunDate(getBaseDate());
  r.nextDay();
  var n = r.toDate();
  var expected = new Date(2013, 11, 7, 0, 0, 0, 0);
  deepEqual( n, expected );
});

test( "RunDate should increase day twice", function() {
  var r = new Schedule.RunDate(getBaseDate());
  r.nextDay();
  r.nextDay();
  var n = r.toDate();
  var expected = new Date(2013, 11, 8, 0, 0, 0, 0);
  deepEqual( n, expected );
});

test( "should parse a * for day in every day at midnight", function() {
  var s = new Schedule('*', '0', '0');
  var n = s.getData();
  var expected = {days: [1,1,1,1,1,1,1], hours: [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], mins: [1,0,0,0,0,0,0,0,0,0,0,0]};
  deepEqual( n, expected );
});

test( "should parse a 1-5 for every week day Monday to Friday at midnight", function() {
  var s = new Schedule('1-5', '0', '0');
  var n = s.getData();
  var expected = {days: [0,1,1,1,1,1,0], hours: [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], mins: [1,0,0,0,0,0,0,0,0,0,0,0]};
  deepEqual( n, expected );
});

test( "should parse a 1-5/2 for every Monday, Wed and Friday at midnight", function() {
  var s = new Schedule('1-5/2', '0', '0');
  var n = s.getData();
  var expected = {days: [0,1,0,1,0,1,0], hours: [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], mins: [1,0,0,0,0,0,0,0,0,0,0,0]};
  deepEqual( n, expected );
});

test( "should parse a */2 for every Sunday, Tue, Thr and Sat at midnight", function() {
  var s = new Schedule('*/2', '0', '0');
  var n = s.getData();
  var expected = {days: [1,0,1,0,1,0,1], hours: [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], mins: [1,0,0,0,0,0,0,0,0,0,0,0]};
  deepEqual( n, expected );
});

test( "should parse a */2,3 for every Sunday, Tue, Wed, Thr and Sat at midnight", function() {
  var s = new Schedule('*/2,3', '0', '0');
  var n = s.getData();
  var expected = {days: [1,0,1,1,1,0,1], hours: [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], mins: [1,0,0,0,0,0,0,0,0,0,0,0]};
  deepEqual( n, expected );
});

test( "should parse a 0,6 for every weekend at midnight", function() {
  var s = new Schedule('0,6', '0', '0');
  var n = s.getData();
  var expected = {days: [1,0,0,0,0,0,1], hours: [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], mins: [1,0,0,0,0,0,0,0,0,0,0,0]};
  deepEqual( n, expected );
});

test( "should parse once a week on Monday at five in the morning", function() {
  var s = new Schedule('1', '5', '0');
  var n = s.getData();
  var expected = {days: [0,1,0,0,0,0,0], hours: [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], mins: [1,0,0,0,0,0,0,0,0,0,0,0]};
  deepEqual( n, expected );
});

test( "should take a * for day, every day at midnight", function() {
  var s = new Schedule('*', '0', '0');
  var n = s.next(getBaseDate());
  var expected = new Date(2013, 11, 7, 0, 0, 0, 0);
  deepEqual( n, expected );
  n = s.next(new Date(2013, 11, 7, 0, 1, 0, 0));
  expected = new Date(2013, 11, 8, 0, 0, 0, 0);
  deepEqual( n, expected );
  n = s.next(new Date(2013, 11, 8, 0, 1, 0, 0));
  expected = new Date(2013, 11, 9, 0, 0, 0, 0);
  deepEqual( n, expected );
  n = s.next(new Date(2013, 11, 9, 0, 1, 0, 0));
  expected = new Date(2013, 11, 10, 0, 0, 0, 0);
  deepEqual( n, expected );
  n = s.next(new Date(2013, 11, 10, 0, 1, 0, 0));
  expected = new Date(2013, 11, 11, 0, 0, 0, 0);
  deepEqual( n, expected );
  n = s.next(new Date(2013, 11, 11, 0, 1, 0, 0));
  expected = new Date(2013, 11, 12, 0, 0, 0, 0);
  deepEqual( n, expected );
  n = s.next(new Date(2013, 11, 12, 0, 1, 0, 0));
  expected = new Date(2013, 11, 13, 0, 0, 0, 0);
  deepEqual( n, expected );
  n = s.next(new Date(2013, 11, 13, 0, 1, 0, 0));
  expected = new Date(2013, 11, 14, 0, 0, 0, 0);
  deepEqual( n, expected );
  n = s.next(new Date(2013, 11, 14, 0, 1, 0, 0));
  expected = new Date(2013, 11, 15, 0, 0, 0, 0);
  deepEqual( n, expected );
});

test( "should take a * for day, every five minutes", function() {
  var s = new Schedule('*', '*', '*');
  var date = getBaseDate();
  var expected = new Date(2013, 11, 6, 6, 0, 0, 0);
  for (var i = 0; i < 100; i++) {
    var n = s.next(date);
    deepEqual( n, expected );
    date = new Date(date.getTime() + 300000);
    expected = new Date(expected.getTime() + 300000);
  }
});

test( "should schedule once a week on Sunday at midnight", function() {
  var s = new Schedule('0', '0', '0');
  var date = getBaseDate();
  var expected = new Date(2013, 11, 8, 0, 0, 0, 0);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 6, 6, 0, 0, 0);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 6, 23, 0, 0, 0);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 6, 23, 55, 0, 0);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 6, 23, 59, 59, 0);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 7, 0, 0, 0, 0);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 7, 7, 0, 0, 0);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 7, 22, 0, 0, 0);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 7, 23, 50, 0, 0);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 7, 23, 55, 0, 0);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 7, 23, 59, 59, 600);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 8, 0, 0, 0, 0);
  deepEqual( s.next(date), expected, date );

  expected = new Date(2013, 11, 15, 0, 0, 0, 0);

  date = new Date(2013, 11, 8, 0, 1, 0, 0);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 8, 1, 0, 0, 0);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 9, 0, 0, 0, 0);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 10, 12, 0, 0, 0);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 14, 23, 0, 0, 0);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 14, 23, 55, 0, 0);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 14, 23, 56, 0, 0);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 14, 23, 59, 0, 0);
  deepEqual( s.next(date), expected, date );

  date = new Date(2013, 11, 15, 0, 0, 0, 0);
  deepEqual( s.next(date), expected, date );
});

test( "should schedule once a week on Monday at five in the morning", function() {
  var s = new Schedule('1', '5', '0');
  var date = getBaseDate();
  var expected = new Date(2013, 11, 9, 5, 0, 0, 0);
  for (var i = 0; i <= 20; i++) {
    var n = s.next(date);
    deepEqual( n, expected );
    date = new Date(date.getTime() + millisPerDay);
    if ((i + 5) % 7 == 0) {
      expected = new Date(expected.getTime() + (7 * millisPerDay));
    }
  }
});

test( "should schedule only once every five minutes if previous is given", function() {
  var s = new Schedule('*', '*', '*');
  var date = getBaseDate();
  var expected = new Date(2013, 11, 6, 6, 0, 0, 0);
  var n = s.next(date, null);
  deepEqual( n, expected );

  expected = new Date(expected.getTime() + 300000);
  var prev = n;
  n = s.next(date, prev);
  deepEqual( n, expected, prev );
});

test( "should construct new Schedule from data", function() {
  var ds = new Schedule('*', '0', '0');
  var data = ds.getData();

  var s = new Schedule('*', '*', '*');  // create a new schedule to wipe out the old one if stored
  s = Schedule.fromData(data);  //create one from data
  var n = s.next(getBaseDate());
  var expected = new Date(2013, 11, 7, 0, 0, 0, 0);
  deepEqual( n, expected );
});

function TestSchedule() {

}
TestSchedule.prototype.next = function() {
  var date = new Date();
  return new Date(date.getTime() - date.getMilliseconds() + 1000);
};

asyncTest( "Scheduler should run the two jobs alternatively", function() {
  var result = [];
  var j1 = new Job('J1', new Action('J1'), new TestSchedule());
  var j2 = new Job('J2', new Action('J2'), new TestSchedule());
  var s = new Scheduler([j1, j2], function(job) {
    result.push(job.title);
    job.done();
  });
  s.start();
  setTimeout(function() {
    s.stop();
    var expected = ['J1', 'J2', 'J1', 'J2'];
    deepEqual( result, expected );
    start();
  }, 2000);
});

//TODO need tests from getData, setData and fromData for all classes that have it
