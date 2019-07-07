import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Field } from "formik";
import { Segment, Form, Button } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";
import cuid from "cuid";
import TextInput from "../../../app/common/form/TextInput";
import * as Yup from "yup";

// Yup Configuration
const EventSchema = Yup.object().shape({
  title: Yup.string()
    .required("Event title is required.")
    .min(2, "Too short.")
});

class EventForm extends Component {
  // FORM SUBMIT
  onHandleSubmit = (values) => {
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.push(`/events/${this.props.initialValues.id}`);
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob"
      };
      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
  };

  render() {
    const { history, initialValues } = this.props;
    return (
      <Segment>
        <Formik
          initialValues={{
            ...this.props.initialValues
          }}
          validationSchema={EventSchema}
          onSubmit={(values, { setSubmitting }) => {
            this.onHandleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid
          }) => {
            return (
              <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Field>
                  <label>Event Title</label>
                  <Field
                    type="text"
                    name="title"
                    placeholder="Event Title..."
                    component={TextInput}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Event Date</label>
                  <input
                    type="date"
                    placeholder="Event Date"
                    name="date"
                    onChange={handleChange}
                    value={values.date}
                  />
                </Form.Field>
                <Form.Field>
                  <label>City</label>
                  <input
                    placeholder="City event is taking place"
                    name="city"
                    onChange={handleChange}
                    value={values.city}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Venue</label>
                  <input
                    placeholder="Enter the Venue of the event"
                    name="venue"
                    onChange={handleChange}
                    value={values.venue}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Hosted By</label>
                  <input
                    placeholder="Enter the name of person hosting"
                    name="hostedBy"
                    onChange={handleChange}
                    value={values.hostedBy}
                  />
                </Form.Field>
                <Button
                  positive
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={
                    initialValues.id
                      ? () => history.push(`/events/${initialValues.id}`)
                      : () => history.push("/events")
                  }
                >
                  Cancel
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Segment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: ""
  };

  if (eventId && state.events.length > 0) {
    event = state.events.filter((event) => {
      return event.id === eventId;
    })[0];
  }

  return {
    initialValues: event
  };
};

const actions = {
  createEvent,
  updateEvent
};

const finalEventForm = connect(
  mapStateToProps,
  actions
)(EventForm);

export default finalEventForm;
