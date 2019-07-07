import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Field } from "formik";
import {
  Segment,
  Form,
  Button,
  Grid,
  Header,
  Divider
} from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";
import cuid from "cuid";
import TextInput from "../../../app/common/form/TextInput";
import * as Yup from "yup";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";

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
    .min(2, "Too short."),
  category: Yup.string().required("Category is required!")
});

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

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
            // setFieldValue,
            // setFieldTouched,
            handleSubmit,
            isSubmitting,
            isValid
          }) => {
            return (
              <Grid>
                <Grid.Column width={10}>
                  <Segment>
                    <Header sub color="teal" content="Event Details" />
                    <Divider hidden />
                    <Form onSubmit={handleSubmit} autoComplete="off">
                      <Field
                        type="text"
                        name="title"
                        datalabel="Event Title"
                        placeholder="Give your event a name"
                        component={TextInput}
                      />
                      <Field
                        name="category"
                        datalabel="What is your event about?"
                        placeholder="Event category..."
                        // value={}
                        options={category}
                        // onChange={setFieldValue}
                        // onBlur={setFieldTouched}
                        component={SelectInput}
                      />
                      <Field
                        type="text"
                        name="description"
                        datalabel="Tell us about your event"
                        rows={4}
                        placeholder="Event description..."
                        component={TextArea}
                      />

                      <Header
                        sub
                        color="teal"
                        content="Event Location Details"
                      />
                      <Divider hidden />
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
                  </Segment>
                </Grid.Column>
                <Grid.Column width={6} />
              </Grid>
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
