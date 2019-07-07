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
    .min(2, "Too short."),
  description: Yup.string()
    .required("Event description is required.")
    .min(9, "Too short."),
  city: Yup.string()
    .required("Event city is required.")
    .min(3, "Too short."),
  venue: Yup.string()
    .required("Event venue is required.")
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
            // values,
            // errors,
            // touched,
            // handleChange,
            // handleBlur,
            handleSubmit,
            isSubmitting,
            isValid
          }) => {
            return (
              <Form onSubmit={handleSubmit} autoComplete="off">
                <Field
                  type="text"
                  name="title"
                  datalabel="Event Title"
                  placeholder="Event Title..."
                  component={TextInput}
                />
                <Field
                  type="text"
                  name="category"
                  datalabel="Event Category"
                  placeholder="Event category..."
                  component={TextInput}
                />
                <Field
                  type="text"
                  name="description"
                  datalabel="Event Description"
                  placeholder="Event description..."
                  component={TextInput}
                />
                <Field
                  type="text"
                  name="city"
                  datalabel="Event City"
                  placeholder="City event is taking place"
                  component={TextInput}
                />
                <Field
                  type="text"
                  name="venue"
                  datalabel="Event Venue"
                  placeholder="Enter the Venue of the event"
                  component={TextInput}
                />
                <Field
                  type="text"
                  name="date"
                  datalabel="Event Date"
                  placeholder="Event Date..."
                  component={TextInput}
                />

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
    category: "",
    description: "",
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
