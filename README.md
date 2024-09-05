<a id="readme-top"></a>

<div align="center">
  <h1 align="center">BrainKey</h1>
  <p align="center">
    A Virtual Keyboard Controlled Using Eye Blinks.
    <br />
    <a href="https://www.ijcrt.org/papers/IJCRT2103649.pdf"><strong>Read the paper.</strong></a>
    <br />
    <br />
  </p>
</div>

## Technologies Used
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Electron.js](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)
![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)
![Pandas](https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white)
![Matplotlib](https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=for-the-badge&logo=Matplotlib&logoColor=black)
![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)

## Overview
BrainKey is a virtual keyboard that enables individuals suffering from conditions like Amyotrophic Lateral Sclerosis (ALS) and Dysarthria to communicate using their eye blinks. Leveraging Brain-Computer Interface (BCI) technology and EEG signals, the system captures eye blink patterns to allow users to type and communicate. This project is built using Electron JS and utilizes the Neurosky Mindwave Mobile 2 headset.

## Features
- **Eye Blink-Based Typing:** Allows users to type alphabetically using intentional eye blinks.
- **Word Prediction:** Provides a list of predicted words as the user types, minimizing the time required to form sentences.
- **Emergency Help Button:** The system includes a help button to sound an alarm in case of emergencies, accessible via three intentional eye blinks
- **Predefined Sentence Buttons:** Allows for customization of frequently used sentences, reducing the need for repetitive typing.
- **Low-Latency Interface:** Requires a maximum of three blinks to select any character, ensuring fast and accurate typing.

## System Architecture
#### Hardware
  - Neurosky Mindwave Mobile 2: A wearable EEG headset that captures brainwave activity and eye blinks. It connects to the system via Bluetooth.
  - Electroencephalography (EEG): EEG electrodes pick up brain waves, which are digitized and sent to the computer for processing.
#### Software
  - Electron JS: The desktop application built using Electron JS includes a virtual keyboard, word prediction, and utility buttons.
  - Blink Detection and Processing: Eye blink signals are processed in real-time, and the system distinguishes between different types of blinks to execute typing operations.
