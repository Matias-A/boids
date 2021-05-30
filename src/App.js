import './App.css';
import Canvas from './Canvas';
import Slider from '@material-ui/core/Slider';
import React from 'react';
import Flock from './flock.js';

function App() {
    const [value1, setValue1] = React.useState(50);
    const [value2, setValue2] = React.useState(50);
    const [value3, setValue3] = React.useState(50);

    let flock = new Flock(1);

    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.font = '20px serif';
        ctx.fillText("Separation: " + value1, 10, 20);
        ctx.fillText("Alignment: " + value2, 10, 40);
        ctx.fillText("Cohesion: " + value3, 10, 60);

        flock.draw(ctx);

    }

    const handleChange1 = (event, newValue) => {
        flock.setSeparation(newValue);
        setValue1(newValue);
    };

    const handleChange2 = (event, newValue) => {
        flock.setAlignment(newValue);
        setValue2(newValue);
    };

    const handleChange3 = (event, newValue) => {
        flock.setCohesion(newValue);
        setValue3(newValue);
    };

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

export default App;
