var dailyIdList = ["mdaily", "sdaily", "wdaily", "widaily"];
var weeklyIdList = ["mweekly", "sweekly", "wweekly", "wiweekly"];
// Get current date.
var date = new Date();
var dayOfWeek = date.getDay() + 1;
var currentHour = date.getHours();

function drawCharts(weekday, hour) {
  if (!weekday) {
    weekday = dayOfWeek;
    hour = currentHour;
  }


  // Daily Charts
  for (var i = 0; i < 4; i++) {
    var daily = c3.generate({
        bindto: '#' + dailyIdList[i],
        data: {
          columns: [
            ["Baseline"].concat(currentData[i].hourly_baseline.slice(24 * weekday, 24 * (weekday + 1))),
            ["Current Period"].concat(currentData[i].hourly.slice(currentData[i].hourly.length - hour, currentData[i].hourly.length))
          ],
          axes: {
            data2: 'y2'
          }
        },
        axis: {
          y: {
            label: { // ADD
              text: 'Kilowatt Hours',
              position: 'outer-middle'
            }
          }
        }
    });
  }

  // Weekly Charts
  for (var i = 0; i < 4; i++) {
    var wiweekly = c3.generate({
        bindto: '#' + weeklyIdList[i],
        data: {
          columns: [
            ["Baseline"].concat(currentData[i].weekly_baseline.slice(0, 7)),
            ["Current Period"].concat(currentData[i].weekly.slice(currentData[i].weekly.length - currentData[i].weekly.length % 7, currentData[i].weekly.length))
          ],
          axes: {
            data2: 'y2'
          }
        },
        axis: {
          y: {
            label: { // ADD
              text: 'Kilowatt Hours',
              position: 'outer-middle'
            }
          }
        }
    });
  }
}
// ,
// x: {
//   tick: {
//     values: ["12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM",]
//   }
// }
// ,
// x: {
//   tick: {
//     values: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
//   }
// }
