# Motion Graph Playground

A simple, customizable kinematics graphing tool for visualizing **distance**, **velocity**, and **acceleration** vs time.

## Features

- Enter **initial velocity** (`u`), **constant acceleration** (`a`), and **total time**.
- Easily switch between plotting **Distance**, **Velocity**, or **Acceleration** vs Time.
- Paste or type a **custom acceleration sequence** (e.g. `1, 0, -2, 2`) for piecewise or variable motion.
- Results update instantly and the graph is always centered.
- Download your graph as a PNG image with a single click.
- Lightweight, classic Win95-style UI (Verdana font).

## Try it out

1. Set your initial parameters in the input panel.
2. *Optionally*, add a custom acceleration sequence to see stepwise or varying motion.
3. Choose the desired graph type.
4. Click **Plot Motion Graph** to display the graph.
5. Click **Download Graph** to save your chart as an image.

## Example Inputs

- **Classic motion (constant acceleration):**
  - `u = 2`, `a = 1`, `t = 8`
- **Piecewise acceleration:**  
  - Custom Acceleration: `1 2 -2 0 3`
- **Projectile (throw upwards):**
  - `u = 10`, `a = -2`, `t = 10`

## Usage

This tool is built with [Chart.js](https://www.chartjs.org/) and simple HTML/CSS/JS.
No installation needed—just open the [GitHub Pages site](https://YOUR-USERNAME.github.io/YOUR-REPO/) or the demo `index.html`.

## License

MIT © [artymst](https://github.com/artymst)
