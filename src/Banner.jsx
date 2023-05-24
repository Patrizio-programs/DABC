import React, { useEffect, useState } from "react";
import axios from "axios";
import "./banner.css";

const Banner = () => {
  const [event, setEvent] = useState(null);
  const [eventSrc, setEventSrc] = useState(null);

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
      .then((response) => response.data)
      .then((data) => {
        const newData = data.items;

        const today = new Date();
        const closestEvent = data.items.reduce(
          (closest, current) => {
            const eventDate = new Date(current.eventDate);
            const timeDiff = eventDate.getTime() - today.getTime();
            const dayDiff = timeDiff / (1000 * 3600 * 24);
            if (dayDiff >= 0 && dayDiff < closest.dayDiff) {
              return { event: current, dayDiff: dayDiff };
            } else {
              return closest;
            }
          },
          {event: null, dayDiff: Infinity }
        ).event;

        if (closestEvent) {
          setEvent(closestEvent);

          const linkEvent = newData.find(event => event.id === closestEvent.id);
          const courseLink = linkEvent["link-courses-title"];
          const eventSrc = `https://www.dyslexiaallianceforblackchildren.org/${courseLink}`;
          setEventSrc(eventSrc);
        } else {
          setEvent("No upcoming events");
        }
      });
  }, []);

  if (!event) {
    return null; // or return a loading spinner or message
  }

  return (
    
    <div className="row">
      <div className="text-box">
        <div className="py-0 px-0">
          <h6 className="mb-0">Event: {event !== "No upcoming events" ? event.title : event}</h6>
          <div className="d-flex mt-2">
            <div className="flex-grow-1">
              {event !== "No upcoming events" && <a href={eventSrc} target='blank'>Event Page</a>}
            </div>
            <div>
            <p className="mb-0 border-1 ">
                {event !== "No upcoming events" && event.eventDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default Banner;