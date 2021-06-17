import './App.css';
import Canvas from './Canvas';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
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

            dragging: false,
            dragStart: {x: 0, y: 0},
            dragCurr: {x: 0, y: 0},
        }
        this.flock = new Flock(20, defaultSeparation, defaultAlignment, defaultCohesion, defaultVision);

        this.frameCount = -1;

        this.handleSeparation.bind(this);
        this.handleAlignment.bind(this);
        this.handleCohesion.bind(this);
        this.handleVision.bind(this);
        this.draw.bind(this);
    }

    handleSeparation(event, newValue) {
        event.preventDefault();
        this.flock.setSeparation(newValue);
        this.setState({separation: newValue});
    }

    handleAlignment(event, newValue) {
        event.preventDefault();
        this.flock.setAlignment(newValue);
        this.setState({alignment: newValue});
    }

    handleCohesion(event, newValue) {
        event.preventDefault();
        this.flock.setCohesion(newValue);
        this.setState({cohesion: newValue});
    }

    handleVision(event, newValue) {
        event.preventDefault();
        this.flock.setVision(newValue);
        this.setState({vision: newValue});
    }

    dragStart(e) {
        this.setState({
            dragging: true,
            dragStart: {
                x: e.clientX,
                y: e.clientY
            },
            dragCurr: {
                x: e.clientX,
                y: e.clientY
            }
        });
    }

    dragMove(e) {
        if (this.state.dragging) {
            this.setState({
                dragCurr: {
                    x: e.clientX,
                    y: e.clientY
                }
            })
        }
    }

    dragEnd(e) {
        this.setState({dragging: false});
        if (this.state.dragStart.x === this.state.dragCurr.x &&
            this.state.dragStart.y === this.state.dragCurr.y) return;

        let x = this.state.dragStart.x;
        let y = this.state.dragStart.y;

        let vec_x = this.state.dragCurr.x - this.state.dragStart.x;
        let vec_y = this.state.dragCurr.y - this.state.dragStart.y;

        let ang = Math.PI / 2 - Math.atan2(vec_y,vec_x);


        this.flock.addBoid(x, y, ang);
    }

    handleRestart(e) {
        e.preventDefault();
        this.flock = new Flock(20,
                        this.state.separation,
                        this.state.alignment,
                        this.state.cohesion,
                        this.state.vision);
    }

    draw(ctx, frameCount) {
        if (frameCount === this.frameCount) {
            return;
        }
        this.frameCount = frameCount;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000';
        this.flock.draw(ctx);
        if (this.state.dragging) {
            ctx.beginPath();
            ctx.moveTo(this.state.dragStart.x, this.state.dragStart.y);
            ctx.lineTo(this.state.dragCurr.x, this.state.dragCurr.y);
            ctx.stroke();
        }
    }

    render() {
        return (
            <div className="App">
                <h1 className="Title">boids</h1>
                <div className="restart-button">
                    <Button
                        onClick={(e)=>this.handleRestart(e)}>
                    Restart
                    </Button>
                </div>
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
                <Canvas className="canvas"
                    onMouseDown={(e)=>this.dragStart(e)}
                    onMouseMove={(e)=>this.dragMove(e)}
                    onMouseUp={(e)=>this.dragEnd(e)}
                    draw={(c, f) => this.draw(c,f)}/>
            </div>
        );
    }
}

export default App;
