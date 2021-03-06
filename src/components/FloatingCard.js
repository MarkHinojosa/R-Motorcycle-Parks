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

    this.isValid()
      ? this.makePostToServer()
      : console.log("is submission valid?", this.isValid());
  };

  makePostToServer = () => {
    this.props.submittingData();
    Axios.post(
      `https://guarded-everglades-11833.herokuapp.com/api/submission`,
      {
        email: this.state.cardDetails.email,
        details: this.state.cardDetails.details,
        coordinates: [this.props.coordinates.lng, this.props.coordinates.lat],
        trailName: this.state.cardDetails.trailName,
        lat: this.props.coordinates.lat,
        lng: this.props.coordinates.lng
      }
    ).then(res => {
      this.setState({ sendingData: false, sentParkData: true });
      this.props.submittedData();
    });
  };

  isValid = () => {
    let { email, details, trailName } = this.state.cardDetails;

    trailName = trailName.trim();
    details = details.trim();
    email = email.trim();

    const validSubmission =
      trailName.length >= 3 &&
      trailName.length < 100 &&
      details.length >= 5 &&
      details.length < 500 &&
      email.length >= 5 &&
      email.length < 50;

    return validSubmission && this.props.haveUsersLocation ? true : false;
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
      <Card className="floating-card" style={{}}>
        <Card.Body>
          {/* form begins here */}
          {this.state.sentParkData ? (
            <Card.Text>
              Your contribution has been submitted. Thanks for using Motorcycle
              Maps!
            </Card.Text>
          ) : (
            <div>
              {/* <Card.Title>share a riding trail!</Card.Title> */}
              <div className="card-title">share a trail!</div>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="label-text">Email address</Form.Label>
                  <Form.Control
                    required
                    name="email"
                    onChange={this.handleTextChange}
                    type="email"
                    placeholder="Enter email"
                  />
                  <Form.Text className="text-muted ">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="label-text">Name of trail</Form.Label>
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
                  <Form.Label className="label-text">
                    Details about this trail
                  </Form.Label>
                  <Form.Control
                    required
                    name="details"
                    onChange={this.handleTextChange}
                    placeholder="Enter details"
                    as="textarea"
                    rows="1"
                  />
                </Form.Group>
                <div className="container">
                  <div className="row align-items-center">
                    <Button
                      size="sm"
                      className="submit-button col-sm"
                      variant="primary"
                      type="submit"
                      disabled={!this.props.haveUsersLocation}
                    >
                      Submit
                    </Button>
                    <div className="col-sm"></div>
                    <Alert.Link
                      size="sm"
                      onClick={this.handleAboutClick}
                      className="about-container col-xs"
                    >
                      <text className="about-text">About</text>
                    </Alert.Link>
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
