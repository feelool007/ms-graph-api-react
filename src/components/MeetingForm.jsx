import React, { useState } from "react";
import { TextField, Button, Grid, Link, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import _ from "lodash";

import useMeetingFormStyles from "./MeetingForm.style";
import {
  getEvent,
  createEvent,
  updateEvent,
  cancelEvent,
} from "../api/msGraph.api";
import { replaceEventBodyContent } from "../utils/utils";

export default () => {
  const classes = useMeetingFormStyles();
  const [meetingInfo, setMeetingInfo] = useState({
    id: "",
    subject: "",
    body: "",
    start: "2021-09-04T10:00:00",
    end: "2021-09-04T12:00:00",
    location: "",
    attendees: [],
  });
  const [loading, setLoading] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState("");
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");

  const handleChange = (event) => {
    setMeetingInfo({
      ...meetingInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeAttendee = (index, event) => {
    const nextAttendees = [].concat(
      meetingInfo.attendees.slice(0, index),
      event.target.value,
      meetingInfo.attendees.slice(index + 1)
    );
    handleChange({
      target: {
        name: "attendees",
        value: nextAttendees,
      },
    });
  };

  const addAttendee = () => {
    handleChange({
      target: {
        name: "attendees",
        value: meetingInfo.attendees.concat(""),
      },
    });
  };

  const generatePayload = () => {
    return {
      subject: meetingInfo.subject,
      start: {
        dateTime: meetingInfo.start,
        timeZone: "Asia/Taipei",
      },
      end: {
        dateTime: meetingInfo.end,
        timeZone: "Asia/Taipei",
      },
      location: {
        displayName: meetingInfo.location
      },
      body: {
        contentType: "HTML",
        content: `<div id="agenda-topics">
          <a
            href="https://www.microsoft.com/zh-tw/microsoft-teams/group-chat-software"
            style="cursor:pointer;font-size:11px;"
          >
            前往teams
          </a>
          <br />
          <span>
            ${meetingInfo.body}
          </span>
        </div>`,
      },
      isOnlineMeeting: true,
      allowNewTimeProposals: false,
      onlineMeetingProvider: "teamsForBusiness",
      attendees: meetingInfo.attendees.map((a) => ({
        emailAddress: {
          address: a,
        },
        type: "required",
      })),
    };
  };

  const handleGet = async () => {
    try {
      const response = await getEvent(meetingInfo.id);
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleSubmit = async () => {
    const payload = generatePayload();
    setLoading(true);
    setMeetingUrl("");
    try {
      const response = await createEvent(payload);
      console.log(response);
      setMeetingUrl(response.onlineMeeting.joinUrl);
      handleChange({
        target: {
          name: "id",
          value: response.id,
        },
      });
      setFeedbackOpen(true);
      setAlertSeverity("success");
      setAlertMsg("Create success.");
    } catch (error) {
      console.log(error);
      setFeedbackOpen(true);
      setAlertSeverity("danger");
      setAlertMsg("Create failed.");
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    let calendarEvent = await handleGet();
    if (calendarEvent) {
      let bodyContent = replaceEventBodyContent(
        calendarEvent.body.content,
        meetingInfo.body,
        "#agenda-topics"
      );
      let payload = _.assign({}, generatePayload(), {
        body: {
          contentType: "HTML",
          content: bodyContent,
        },
      });
      setLoading(true);
      setMeetingUrl("");
      try {
        const response = await updateEvent(meetingInfo.id, payload);
        console.log(response);
        setMeetingUrl(response.onlineMeeting.joinUrl);
        setFeedbackOpen(true);
        setAlertSeverity("success");
        setAlertMsg("Update success.");
      } catch (error) {
        console.log(error);
        setFeedbackOpen(true);
        setAlertSeverity("danger");
        setAlertMsg("Update failed.");
      }
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    setLoading(true);
    try {
      await cancelEvent(meetingInfo.id, { comment: "Meeting canceled." });
      setMeetingUrl("");
      handleChange({
        target: {
          name: "id",
          value: "",
        },
      });
      setFeedbackOpen(true);
      setAlertSeverity("success");
      setAlertMsg("Cancel success.");
    } catch (error) {
      console.log(error);
      setFeedbackOpen(true);
      setAlertSeverity("danger");
      setAlertMsg("Cancel failed.");
    }
    setLoading(false);
  };

  const openOnlineMeeting = () => {
    window.open(meetingUrl, "_blank");
  };

  return (
    <Grid className={classes["meeting-form"]}>
      <TextField
        name="id"
        label="ID"
        value={meetingInfo.id}
        onChange={handleChange}
      />
      <TextField
        name="subject"
        label="Subject"
        value={meetingInfo.subject}
        onChange={handleChange}
      />
      <TextField
        name="start"
        label="StartTime"
        value={meetingInfo.start}
        onChange={handleChange}
      />
      <TextField
        name="end"
        label="EndTime"
        value={meetingInfo.end}
        onChange={handleChange}
      />
      <TextField
        name="location"
        label="Location"
        value={meetingInfo.location}
        onChange={handleChange}
      />
      <TextField
        name="body"
        label="Content"
        value={meetingInfo.body}
        onChange={handleChange}
      />
      {meetingInfo.attendees.map((a, index) => (
        <TextField
          key={index}
          name={`attendee_${index + 1}`}
          label={`Attendee_${index + 1}`}
          value={a}
          onChange={(event) => handleChangeAttendee(index, event)}
        />
      ))}
      <Grid className={classes["meeting-actions"]}>
        <Button color="primary" variant="contained" onClick={addAttendee}>
          Add attendee
        </Button>
        <Button
          disabled={loading}
          color="secondary"
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          disabled={loading || !meetingInfo.id}
          color="secondary"
          variant="contained"
          onClick={handleUpdate}
        >
          Update
        </Button>
        <Button
          disabled={loading || !meetingInfo.id}
          color="secondary"
          variant="contained"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Grid>
      {meetingUrl && (
        <Link onClick={openOnlineMeeting}>在新視窗中加入會議</Link>
      )}
      <Snackbar
        open={feedbackOpen}
        autoHideDuration={2500}
        onClose={() => setFeedbackOpen(false)}
      >
        <Alert onClose={() => setFeedbackOpen(false)} severity={alertSeverity}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </Grid>
  );
};
