import './App.css';
import Canvas from './Canvas';
import Slider from '@material-ui/core/Slider';
import React from 'react';
import Flock from './flock.js';

const defaultSeparation = 50;
const defaultAlignment = 50;
const defaultCohesion = 50;
const defaultVision = 50;


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            separation: defaultSeparation,
            alignment: defaultAlignment,
            cohesion: defaultCohesion,
            vision: defaultVision,
        }
        this.flock = new Flock(20, defaultSeparation, defaultAlignment, defaultCohesion, defaultVision);

        this.handleSeparation.bind(this);
        this.handleAlignment.bind(this);
        this.handleCohesion.bind(this);
        this.handleVision.bind(this);
        this.draw.bind(this);
    }

    handleSeparation(event, newValue) {
        this.flock.setSeparation(newValue);
        this.setState({separation: newValue});
    };

    handleAlignment(event, newValue) {
        this.flock.setAlignment(newValue);
        this.setState({alignment: newValue});
    };

    handleCohesion(event, newValue) {
        this.flock.setCohesion(newValue);
        this.setState({cohesion: newValue});
    };

    handleVision(event, newValue) {
        this.flock.setVision(newValue);
        this.setState({vision: newValue});
    };

    draw(ctx, frameCount) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000';
        this.flock.draw(ctx);

    }

    render() {
        return (
            <div className="App">
                <h1 className="Title">boids</h1>
                <div className="slider1">
                    <span className="slider-label">Separation</span>
                    <span className="slider">
                        <Slider
                            value={this.state.separation}
                            onChange={(e, v) => this.handleSeparation(e,v)}
                            aria-labelledby="continuous-slider" />
                    </span>
                </div>
                <div className="slider2">
                    <span className="slider-label">Alignment</span>
                    <span className="slider">
                        <Slider
                            value={this.state.alignment}
                            onChange={(e, v) => this.handleAlignment(e,v)}
                            aria-labelledby="continuous-slider" />
                    </span>
                </div>
                <div className="slider3">
                    <span className="slider-label">Cohesion</span>
                    <span className="slider">
                        <Slider
                            value={this.state.cohesion}
                            onChange={(e, v) => this.handleCohesion(e,v)}
                            aria-labelledby="continuous-slider" />
                        </span>
                </div>
                <div className="slider4">
                    <span className="slider-label">Vision</span>
                    <span className="slider">
                        <Slider
                            value={this.state.vision}
                            onChange={(e, v) => this.handleVision(e,v)}
                            aria-labelledby="continuous-slider" />
                        </span>
                </div>
                <Canvas className="canvas" draw={(c, f) => this.draw(c,f)}/>
            </div>
        );
    }
}

export default App;
