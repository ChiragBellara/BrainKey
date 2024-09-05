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
BrainKey is a virtual keyboard that enables individuals suffering from Amyotrophic Lateral Sclerosis (ALS) and Dysarthria to communicate using eye blinks. Leveraging Brain-Computer Interface (BCI) technology and EEG signals, the system captures eye blink patterns to allow users to type and communicate. This project is built using Electron JS and utilizes the Neurosky Mindwave Mobile 2 headset.

## Features
- **Eye Blink-Based Typing:** Allows users to type alphabetically using intentional eye blinks.
- **Word Prediction:** Provides a list of predicted words as the user types, minimizing the time required to form sentences.
- **Emergency Help Button:** The system includes a help button to sound an alarm in case of emergencies, accessible via three intentional eye blinks
- **Predefined Sentence Buttons:** Allows to customize frequently used sentences, reducing the need for repetitive typing.
- **Low-Latency Interface:** Requires a maximum of three blinks to select any character, ensuring fast and accurate typing.

## System Architecture
#### Hardware
  - Neurosky Mindwave Mobile 2: A wearable EEG headset that captures brainwave activity and eye blinks. It connects to the system via Bluetooth.
  - Electroencephalography (EEG): EEG electrodes pick up brain waves, which are digitized and sent to the computer for processing.
#### Software
  - Electron JS: The desktop application built using Electron JS includes a virtual keyboard, word prediction, and utility buttons.
  - Blink Detection and Processing: Eye blink signals are processed in real-time, and the system distinguishes between different types of blinks to execute typing operations.

## How it Works
<div align="center">
    <img alt="image" src="https://github.com/user-attachments/assets/cbd50b0e-76ff-4643-ae40-f04d26f1099e">
    <div>General workflow of the application.</div>
</div>
</br>

- **Connect the EEG headset:** The user wears the Neurosky Mindwave Mobile 2 headset, which captures eye blink signals.
- **Blink detection:** The application detects intentional blinks and categorizes them into a sequence to select characters.
- **Character selection:** Using three blinks, the system selects the desired row, side (left or right), and finally the character.
- **Word prediction:** As the user types, the system updates a list of probable words to reduce typing time.
- **Sentence typing:** Users can customize up to four frequently used sentences for quick access.
</br>
<div align="center">
    <img alt="image" src="https://github.com/user-attachments/assets/6ab27e19-ec83-4f00-a67a-11985e2c3f92">
    <div>Proposed keyboard layout for the application.</div>
</div>
</br>

### Significance of Keyboard Layout
- **Help Button:** Designed for patients who are unable to communicate verbally, the help button is located in the first row of the virtual keyboard. When selected, it triggers an alarm to alert caregivers or people nearby in case of an emergency.
- **Switch Button:** This button allows the user to toggle between the keyboard and the word prediction box, providing seamless switching between typing and predictive text.
- **Speak Button:** Once text is entered into the text box, the speak button enables the system to vocalize the written content aloud, allowing the user to communicate their message audibly.
- **Customizable Sentence Buttons:** Located in the last row of the keyboard, these four buttons can be programmed to store frequently used phrases. Upon selection, the entire sentence is spoken aloud without the need for manual typing. For example, the "Hi" button (last row, third column) can be programmed to say: "Hello, Hi. How are you?" Users can configure these buttons with phrases tailored to their specific needs, streamlining communication.

## Future Enhancements
- **Personalized Blink Strength Thresholds:** User-specific thresholds for eye blink strength can be incorporated for better accuracy.
- **Multiple Language Support:** Adding support for multiple languages to expand the system's utility.
- **BCI-based Gaming and Activities:** Potential for developing games and activities that enhance users' attention and meditation abilities.

## Team
<a href="https://github.com/ChiragBellara/BrainKey/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ChiragBellara/BrainKey" />
</a>
