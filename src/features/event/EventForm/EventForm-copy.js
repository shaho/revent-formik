import React, { Component } from "react";
import { connect } from "react-redux";
import { withFormik, Field } from "formik";
import { Segment, Form, Button } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";
import cuid from "cuid";

class EventForm extends Component {
  state = {
    ...this.props.event
  };

  componentDidMount() {
    if (this.props.selectedEvent !== null) {
      this.setState({
        ...this.props.selectedEvent
      });
    }
  }

  // FORM SUBMIT
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.id) {
      this.props.updateEvent(this.state);
      this.props.history.push(`/events/${this.state.id}`);
    } else {
      const newEvent = {
        ...this.state,
        id: cuid(),
        hostPhotoURL: "/assets/user.png"
      };
      this.props.createEvent(newEvent);
      this.props.history.push(`/events`);
    }
  };

  // FORM CHANGE
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { title, date, city, venue, hostedBy } = this.state;
    const { values } = this.props;
    console.log(values);
    return (
      <Segment>
        <Form onSubmit={this.handleSubmit} autoComplete="off">
          {/* <Form.Field>
            <label>Event Title</label>
            <input
              placeholder="Event Title"
              name="title"
              onChange={this.handleChange}
              value={title}
            />
          </Form.Field> */}
          <Field name="title" type="text" placeholder="Title" value={title} />
          <Form.Field>
            <label>Event Date</label>
            <input
              type="date"
              placeholder="Event Date"
              name="date"
              onChange={this.handleChange}
              value={date}
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              placeholder="City event is taking place"
              name="city"
              onChange={this.handleChange}
              value={city}
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              placeholder="Enter the Venue of the event"
              name="venue"
              onChange={this.handleChange}
              value={venue}
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              placeholder="Enter the name of person hosting"
              name="hostedBy"
              onChange={this.handleChange}
              value={hostedBy}
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={this.props.history.goBack}>
            Cancel
          </Button>
        </Form>
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
    event
  };
};

const actions = {
  createEvent,
  updateEvent
};

const formikEnhancer = withFormik({
  mapPropsToValues: ({ title }) => ({
    title: title || ""
  }),
  handleSubmit: (values, { props, setSubmiting }) => {
    // console.log(values);
    // console.log("Submitting...");
    setSubmiting(false);
  }
})(EventForm);

// export default connect(
//   mapStateToProps,
//   actions
// )(EventForm);

const finalEventForm = connect(
  mapStateToProps,
  actions
)(formikEnhancer);

export default finalEventForm;
