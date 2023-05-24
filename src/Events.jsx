import React, { useState, useEffect } from "react";
import axios from "axios";
import RevoCalendar from "revo-calendar";
import dayjs from "dayjs";
import { Row, Col } from "react-bootstrap";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://proxy.cors.sh/https://dyslexiaallianceforblackchildren.org/_functions/calendarEvents",
        {
          headers: {
            "x-cors-api-key": "temp_edcf08722756a6558a018dc8453ce6c5"
          }
        }
      )
      .then((response) => {
        setEvents(response.data["items"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function newEvent(name, date, allDay, extra) {
    return {
      name,
      date,
      allDay,
      extra: {
        text: extra.description,
        html: extra.courseLinkHtml
      }
    };
  }
  const calendarEvents = events.map((event) => {
    const courseLink = event["link-courses-title"];
    const courseLinkHtml = courseLink
      ? `<a href="https://www.dyslexiaallianceforblackchildren.org/${courseLink}" target="_blank">Event Link</a>`
      : "";
    const description = event.shortEventDescription;
    const name = event.title;
    const dateStr = event.eventDate;
    const date = dayjs(dateStr).toDate();
    const allDay = true;
    const extra = {
      description,
      courseLinkHtml
    };

    return newEvent(name, date, allDay, extra);
  });

  const revoCalendarProps = {
    events: calendarEvents,
    lang: "en",
    primaryColor: "#B71110", // Main color
    secondaryColor: "#CCCCCC", // Secondary color
    todayColor: "#B71110", // Same as main color
    textColor: "black",
    indicatorColor: "#FCAD10",
    animationSpeed: 300,
    sidebarWidth: 180,
    detailWidth: 280,
    showDetailToggler: true,
    showSidebarToggler: true,
    onePanelAtATime: false,
    openDetailsOnDateSelection: true,
    timeFormat24: true,
    showAllDayLabel: false,
    detailDateFormat: "YYYY/MM/DD"
  };

  return (
    <div>
      <RevoCalendar {...revoCalendarProps} />
      <br />
      <div className="event-row">
        {calendarEvents.map((event) => (
          <Col md={6} lg={4} key={event.name}>
            <div className="card mb-4">
              <div className="card-body">
                <h4>{event.name}</h4>

                <div dangerouslySetInnerHTML={{ __html: event.extra.html }} />
                <p>{dayjs(event.date).format("YYYY/MM/DD")}</p>
              </div>
            </div>
          </Col>
        ))}
      </div>
    </div>
  );
}

export default Events;
