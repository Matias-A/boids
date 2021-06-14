import './App.css';
import Canvas from './Canvas';
import Slider from '@material-ui/core/Slider';
import React from 'react';
import Flock from './flock.js';

const defaultSeparation = 100;
const defaultAlignment = 0;
const defaultCohesion = 0;


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            separation: defaultSeparation,
            alignment: defaultAlignment,
            cohesion: defaultCohesion,
        }
        this.flock = new Flock(20, defaultSeparation, defaultAlignment, defaultCohesion);

        this.handleChange1.bind(this);
        this.handleChange2.bind(this);
        this.handleChange3.bind(this);
        this.draw.bind(this);
    }

    handleChange1(event, newValue) {
        this.flock.setSeparation(newValue);
        this.setState({separation: newValue});
    };

    handleChange2(event, newValue) {
        this.flock.setAlignment(newValue);
        this.setState({alignment: newValue});
    };

    handleChange3(event, newValue) {
        this.flock.setCohesion(newValue);
        this.setState({cohesion: newValue});
    };

    draw(ctx, frameCount) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.font = '20px serif';
        ctx.fillText("Separation: " + this.state.separation, 10, 20);
        ctx.fillText("Alignment: " + this.state.alignment, 10, 40);
        ctx.fillText("Cohesion: " + this.state.cohesion, 10, 60);

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
                            onChange={(e, v) => this.handleChange1(e,v)}
                            aria-labelledby="continuous-slider" />
                    </span>
                </div>
                <div className="slider2">
                    <span className="slider-label">Alignment</span>
                    <span className="slider">
                        <Slider
                            value={this.state.alignment}
                            onChange={(e, v) => this.handleChange2(e,v)}
                            aria-labelledby="continuous-slider" />
                    </span>
                </div>
                <div className="slider3">
                    <span className="slider-label">Cohesion</span>
                    <span className="slider">
                        <Slider
                            value={this.state.cohesion}
                            onChange={(e, v) => this.handleChange3(e,v)}
                            aria-labelledby="continuous-slider" />
                        </span>
                </div>
                <Canvas className="canvas" draw={(c, f) => this.draw(c,f)}/>
            </div>
        );
    }
}
/*
function App() {
    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.font = '20px serif';
        ctx.fillText("Separation: " + value1, 10, 20);
        ctx.fillText("Alignment: " + value2, 10, 40);
        ctx.fillText("Cohesion: " + value3, 10, 60);

        flock.draw(ctx);

    }



    return (
        <div className="App">
            <h1 className="Title">boids</h1>
            <div className="slider1">
                <Slider
                    value={value1}
                    onChange={handleChange1}
                    aria-labelledby="continuous-slider" />
            </div>
            <div className="slider2">
                <Slider
                    value={value2}
                    onChange={handleChange2}
                    aria-labelledby="continuous-slider" />
            </div>
            <div className="slider3">
                <Slider
                    value={value3}
                    onChange={handleChange3}
                    aria-labelledby="continuous-slider" />
            </div>
            <Canvas className="canvas" draw={draw}/>
        </div>
    );
}
*/

export default App;
