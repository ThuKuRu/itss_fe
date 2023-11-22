import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { PiCaretDoubleLeftBold } from "react-icons/pi";
import { PiCaretDoubleRightBold } from "react-icons/pi";
import { PiCalendarBlankBold } from "react-icons/pi";
import { IoIosFlag } from "react-icons/io";

const localizer = momentLocalizer(moment);

const tasks = [
  { title: "Task 1", start: new Date(2023, 10, 20), priority: "1" },
  { title: "Task 2", start: new Date(2023, 10, 20), priority: "2" },
  { title: "Task 3", start: new Date(2023, 10, 21), priority: "3" },
  { title: "Task 4", start: new Date(2023, 10, 22), priority: "1" },
  { title: "Task 5", start: new Date(2023, 10, 23), priority: "2" },
  { title: "Task 6", start: new Date(2023, 10, 21), priority: "3" },
  { title: "Task 7", start: new Date(2023, 10, 22), priority: "1" },
  { title: "Task 8", start: new Date(2023, 10, 23), priority: "2" },
  { title: "Task 9", start: new Date(2023, 10, 24), priority: "3" },
  { title: "Task 10", start: new Date(2023, 10, 23), priority: "1" },
  { title: "Task 11", start: new Date(2023, 10, 24), priority: "2" },
  { title: "Task 12", start: new Date(2023, 10, 23), priority: "3" },
  { title: "Task 13", start: new Date(2023, 10, 23), priority: "1" },
  { title: "Task 14", start: new Date(2023, 10, 24), priority: "2" },
  { title: "Task 15", start: new Date(2023, 10, 23), priority: "3" },
  { title: "Task 16", start: new Date(2023, 10, 23), priority: "3" },
  { title: "Task 17", start: new Date(2023, 10, 28), priority: "2" },
  { title: "Task 18", start: new Date(2023, 10, 28), priority: "3" },
  { title: "Task 19", start: new Date(2023, 10, 27), priority: "1" },
  { title: "Task 20", start: new Date(2023, 10, 30), priority: "2" },
  { title: "Task 21", start: new Date(2023, 10, 29), priority: "3" },
  { title: "Task 22", start: new Date(2023, 10, 27), priority: "1" },
  { title: "Học bơi", start: new Date(2023, 10, 15), priority: "1" },
];

const Upcomming = () => {
  const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.onNavigate("PREV");
    };

    const goToNext = () => {
      toolbar.onNavigate("NEXT");
    };

    const goToWeek = () => {
      toolbar.onNavigate("DAY");
    };

    return (
      <div className="flex justify-between mb-3 text-red-500">
        <button onClick={goToBack} className="flex items-center">
          <PiCaretDoubleLeftBold color="#a9a9a9" />
          <p className="text-sm text-gray-400 ml-1 pb-[2px] font-2">Back</p>
        </button>
        <div className="flex items-center cursor-pointer" onClick={goToWeek}>
          <PiCalendarBlankBold style={{ fontSize: "18px" }} />
          <p className="font-semibold ml-1 pb-[2px]">{toolbar.label}</p>
        </div>
        <button onClick={goToNext} className="flex items-center">
          <p className="text-sm text-gray-400 mr-1 pb-[2px] font-2">Next</p>
          <PiCaretDoubleRightBold color="#a9a9a9" />
        </button>
      </div>
    );
  };

  const events = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: task.start,
    end: moment(task.start).add(1, "days").toDate(), // Set end date as one day after start for clarity
    priority: task.priority,
  }));

  const EventComponent = ({ event }) => {
    let priorityColor = "";
    switch (event.priority) {
      case "1":
        priorityColor = "text-red-500"; // Class for priority 1
        break;
      case "2":
        priorityColor = "text-orange-500"; // Class for priority 2
        break;
      case "3":
        priorityColor = "text-blue-500"; // Class for priority 3
        break;
      default:
        priorityColor = "text-gray-500"; // Default color
        break;
    }

    const today = moment().add(-1, "days");

    // const tasksCount = countTasksPerDay(tasks, event.start);

    return (
      <div className={event.start < today ? "hidden-event" : ""}>
        <div className="flex mb-2">
          <input type="radio" />
          <p className="p-1 text-xs">{event.title}</p>
        </div>
        <div
          className={
            event.start < today
              ? "hidden-event flex items-center text-[10px] font-medium py-1"
              : `flex items-center text-[10px] font-medium py-1 ${priorityColor}`
          }
        >
          <IoIosFlag color={`${priorityColor}`} />
          <p>Priority {event.priority}</p>
        </div>
      </div>
    );
  };

  const countTasksPerDay = (tasks, date) => {
    return tasks.filter((task) => {
      return moment(task.start).isSame(date, "day");
    }).length;
  };

  const dayPropGetter = (date) => {
    const tasksCount = countTasksPerDay(tasks, date);
    console.log(tasksCount);
    return {
      className: tasksCount > 0 ? "has-tasks" : "", // Thêm class 'has-tasks' nếu có tasks
      // Thêm bất kỳ thuộc tính nào khác bạn muốn cho ngày
    };
  };

  return (
    <div>
      <style>
        {`
          * {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen","Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif;
          }
          .rbc-header {
            font-weight: 600;
            border: none !important;
            padding: 10px 0; 
            border-bottom: 2px solid #a9a9a9  !important;
            margin: 0 4px;
          }
          .rbc-row-content {
            margin-top: 5px;
          }
          .rbc-event {
            background-color: #ffffff !important;
            margin-top: 8px;
            color: #000000 !important;
            border: 1px solid #a9a9a9 !important;
          }
          .rbc-today {
            color: red;
          }
          .rbc-day-bg {
            border: none !important;
            margin: 0 4px;
          }
          .rbc-row-segment {
            padding : 0 4px;
          }
          .rbc-time-view, .rbc-row-segment , .rbc-row{
            border: none !important;
          }
          .rbc-time-header-content, .rbc-time-header {
            border-left: none;
          }
          .rbc-events-container, .rbc-row {
            border: none !important;
          }
          {/* .rbc-time-header-content > .rbc-time-gutter > * {
            display: none !important;
          } */}
          .rbc-time-header-gutter > :first-child {
            display: none !important;
          }
          .rbc-allday-cell {
            border: none !important;
          }
          div.rbc-time-slot, .rbc-label , .rbc-timeslot-group, .rbc-time-content, .rbc-current-time-indicator {
            display: none !important;
          }
        `}
      </style>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        nowIndicator={false}
        components={{
          toolbar: CustomToolbar,
          // day: DayColumn,
          event: EventComponent,
          agenda: () => null,
          month: () => null,
          day: () => null,
          timeGutterHeader: () => null,
        }}
        style={{ height: "auto", width: "78vw" }}
        eventPropGetter={(event, start, end, isSelected) => {
          let newStyle = {
            borderRadius: "5px",
            border: "none",
            color: "white",
            // Thêm các thuộc tính khác tùy ý
          };
          return { style: newStyle };
        }}
        dayPropGetter={dayPropGetter}
      />
    </div>
  );
};

export default Upcomming;
