import React, { Component } from "react";
import logo from "./logo.svg";
import { Container, Row, Col, Button, ButtonGroup } from "reactstrap";
import "./App.css";
import "./styles/DrumMachine.css";

class App extends Component {
  state = {
    drumPad: ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"],
    currentSoundName: null
  };

  constructor(props) {
    super(props);
    this.display = React.createRef();
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown");
  }

  // playSound = (soundUrl) => {
  //   this.setState(
  //     {
  //       currentSoundName: soundUrl
  //     },
  //     () => {
  //       this.player.pause();
  //       this.player.load();
  //       this.player.play();
  //     }
  //   );
  // };

  playSound = (eventType, eventCode) => {
    let display = this.display.current;
    console.log(display);
    if (eventType === "keydown") {
      const nEventCode = eventCode.replace("Key", "");
      const audio = document.getElementById(nEventCode);
      audio.pause();
      audio.play();
      this.setState({
        currentSoundName: nEventCode
      });
      this.display.current.innerText = "Last Played: " + nEventCode;
      return null;
    } else {
      const audio = document.getElementById(eventCode);
      audio.pause();
      audio.play();
      this.setState({
        currentSoundName: eventCode
      });
      this.display.current.innerText = "Last Played: " + eventCode;
      return null;
    }
  };

  handleKeyDown = (event) => {
    console.log(event);
    switch (event.code) {
      case "KeyQ":
      case "KeyW":
      case "KeyE":
      case "KeyA":
      case "KeyS":
      case "KeyD":
      case "KeyZ":
      case "KeyX":
      case "KeyC":
        return this.playSound(event.type, event.code);
      default:
        return null;
    }
  };

  handleDrumClick = (event, padItem) => {
    switch (padItem) {
      case "Q":
      case "W":
      case "E":
      case "A":
      case "S":
      case "D":
      case "Z":
      case "X":
      case "C":
        return this.playSound(event.type, padItem);
      default:
        return null;
    }
  };

  mapSoundToUrl = (padItem) => {
    switch (padItem) {
      case "Q":
        return "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3";
      case "W":
        return "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3";
      case "E":
        return "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3";
      case "A":
        return "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3";
      case "S":
        return "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3";
      case "D":
        return "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3";
      case "Z":
        return "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3";
      case "X":
        return "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3";
      case "C":
        return "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3";
      default:
        return null;
    }
  };

  render() {
    return (
      <Container id="drum-machine" className="DrumMachineContainer">
        <Row className="DrumRow">
          <Col xs="auto" className="Drum">
            <div id="DrumContainer">
              <ButtonGroup size="lg">
                {this.state.drumPad.map((padItem) => {
                  return (
                    <div
                      color="primary"
                      id={`drum_${padItem}`}
                      key={padItem}
                      className="drum-pad"
                      onClick={(e) => this.handleDrumClick(e, padItem)}
                    >
                      <Button>{padItem}</Button>
                      <audio
                        src={this.mapSoundToUrl(padItem)}
                        id={padItem}
                        className="clip"
                        ref={(player) => {
                          this.player = player;
                        }}
                        controls
                      />
                    </div>
                  );
                })}
              </ButtonGroup>
              <div id="display" ref={this.display} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
