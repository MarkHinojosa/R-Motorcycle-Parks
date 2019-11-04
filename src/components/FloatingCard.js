import React, { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Axios from "axios";

class FloatingCard extends Component {
  state = {
    showAbout: false,
    sentParkData: false,
    sendingData: false
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      sendingData: true
    });
    Axios.post(
      `http://localhost:${process.env.REACT_APP_PORT}/api/submission`,
      {
        email: this.state.cardDetails.email,
        details: this.state.cardDetails.notes,
        coordinates: [this.props.coordinates.lng, this.props.coordinates.lat],
        trailName: this.state.cardDetails.trailName,
        lat: this.props.coordinates.lat,
        lng: this.props.coordinates.lng
      }
    ).then(res => {
      console.log(res, console.log(this.state));
      this.setState({ sendingData: false, sentParkData: true });
      console.log(res, console.log(this.state));
    });
  };

  handleTextChange = event => {
    this.setState({
      cardDetails: {
        ...this.state.cardDetails,
        [event.target.name]: event.target.value
      }
    });
  };

  handleAboutClick = () => {
    this.state.showAbout
      ? this.setState({ showAbout: false })
      : this.setState({ showAbout: true });
  };

  render() {
    return (
      <Card className="message-form">
        <Card.Body>
          {/* form begins here */}
          {this.state.sentParkData ? (
            <Card.Text>Thanks for using Motorcycle Maps!</Card.Text>
          ) : (
            <div>
              <Card.Title>share a riding trail!</Card.Title>

              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    name="email"
                    onChange={this.handleTextChange}
                    type="email"
                    placeholder="Enter email"
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Name of trail</Form.Label>
                  <Form.Control
                    required
                    name="trailName"
                    onChange={this.handleTextChange}
                    placeholder="Enter name of trail"
                    as="textarea"
                    rows="1"
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Notes about this trail</Form.Label>
                  <Form.Control
                    required
                    name="notes"
                    onChange={this.handleTextChange}
                    placeholder="Enter notes"
                    as="textarea"
                    rows="3"
                  />
                </Form.Group>
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-lg">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={!this.props.haveUsersLocation}
                      >
                        Submit
                      </Button>
                    </div>
                    <div className="col-xs">
                      <Alert.Link
                        onClick={this.handleAboutClick}
                        className="align-bottom"
                      >
                        <span>About</span>
                      </Alert.Link>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Card.Body>
        <Alert show={this.state.showAbout}>
          Created by:
          <span class="font-weight-bold text-uppercase"> Mark Hinojosa</span>
          <br />
          <span>markhinojosa1212@gmail.com</span>
          <br />
          <span class=" text-uppercase">React, Leaflet, Node.js, MongoDB </span>
        </Alert>
      </Card>
    );
  }
}

export default FloatingCard;
