import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import { connect } from "react-redux";
import { createEvent, updateEvent, deleteEvent } from "../eventActions";

class EventDashboard extends Component {
  handleUpdateEvent = (updatedEvent) => {
    this.props.updateEvent(updatedEvent);
  };

  // DELETE EVENT
  handleDeleteEvent = (eventId) => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} deleteEvent={this.handleDeleteEvent} />
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Activity Feed</h2>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events
  };
};

const actions = {
  createEvent,
  updateEvent,
  deleteEvent
};

export default connect(
  mapStateToProps,
  actions
)(EventDashboard);
