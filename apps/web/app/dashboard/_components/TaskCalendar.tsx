import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const initialData = [
  {
    title: "Daily Standup",
    start: moment("2025-07-24T10:00:00").toDate(),
    end: moment("2025-07-24T10:30:00").toDate(),
  },
  {
    title: "Design Review",
    start: moment("2025-07-25T14:00:00").toDate(),
    end: moment("2025-07-25T15:00:00").toDate(),
  },
  {
    title: "Project Deadline",
    start: moment("2025-07-26").startOf("day").toDate(),
    end: moment("2025-07-26").endOf("day").toDate(),
    allDay: true,
  },
  {
    title: "Client Presentation",
    start: moment("2025-07-27T11:00:00").toDate(),
    end: moment("2025-07-27T12:30:00").toDate(),
  },
  {
    title: "Team Outing",
    start: moment("2025-07-28T17:00:00").toDate(),
    end: moment("2025-07-28T20:00:00").toDate(),
  },
];

const TaskCalendar = () => {
  const [myEventsList, setMyEventList] = useState(initialData);

  return (
    <div className="w-full min-h-[60vh]">
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        defaultView="month"
        style={{ height: 500 }}
        toolbar
        showAllEvents
      />
    </div>
  );
};

export default TaskCalendar;
