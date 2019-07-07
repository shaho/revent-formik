import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { Segment, Form, Button } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";
import cuid from "cuid";

class EventForm extends Component {
  // state = {
  //   ...this.props.event
  // };

  // componentDidMount() {
  //   if (this.props.selectedEvent !== null) {
  //     this.setState({
  //       ...this.props.selectedEvent
  //     });
  //   }
  // }

  // // FORM SUBMIT
  onHandleSubmit = (values) => {
    // console.log(values);
    // event.preventDefault();
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

  // // FORM CHANGE
  // handleChange = ({ target: { name, value } }) => {
  //   this.setState({ [name]: value });
  // };

  render() {
    // const { title, date, city, venue, hostedBy } = this.state;
    // const { values } = this.props;
    // console.log(values);
    const { history, initialValues } = this.props;
    return (
      <Segment>
        <Formik
          initialValues={{
            ...this.props.initialValues
          }}
          onSubmit={(values) => {
            this.onHandleSubmit(values);
            // if (this.state.id) {
            //   console.log({ ...values });
            //   // alert(JSON.stringify(values));
            // }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => {
            return (
              <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Field>
                  <label>Event Title</label>
                  <input
                    placeholder="Event Title"
                    name="title"
                    onChange={handleChange}
                    value={values.title}
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
                <Button positive type="submit">
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
