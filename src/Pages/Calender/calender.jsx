import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './Style.css'
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
const CalenderSchedule = () => {
  const data = [{
    Id: 1,
    Subject: 'Paris',
    StartTime: new Date(2023, 1, 15, 10, 0),
    EndTime: new Date(2023, 1, 15, 12, 30),
  }];
  const eventSettings = { dataSource: data }

  return <ScheduleComponent height='550px' selectedDate={new Date(2023, 1, 15)} eventSettings={eventSettings}>
    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
  </ScheduleComponent>;
}

export default CalenderSchedule;