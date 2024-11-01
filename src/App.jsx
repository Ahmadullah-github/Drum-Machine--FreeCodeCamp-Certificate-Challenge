import react, { createContext, useContext, useEffect, useState } from 'react';
import './App.css';
const audioClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Kick-n-Hat',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  },
];

const KeyContext = createContext();

const KeyContextProvider = ({ children }) => {
  const [key, setKey] = useState('');
  const updateKey = (newKey) => {
    setKey(newKey);
  };

  return (
    <KeyContext.Provider value={{ key, updateKey }}>
      {children}
    </KeyContext.Provider>
  );
};

const Keyboard = () => {
  const { updateKey } = useContext(KeyContext);

  const handleAudioPaly = (sound) => {
    const { keyTrigger, id } = sound;
    const audioButton = document.getElementById(`${keyTrigger}`);
    updateKey(id);
    audioButton.play();
  };

  useEffect(() => {
    window.document.addEventListener('keydown', (e) => {
      const audioButton = document.getElementById(`${e.key.toUpperCase()}`);
      audioClips.map((each) => {
        if (each.keyTrigger === e.key.toUpperCase()) {
          updateKey(each.id);
          audioButton.play();
        }
      });
    });
  });
  return audioClips.map((sound) => {
    return (
      <div className="keyboard-container">
        <button
          className="drum-pad"
          id={sound.id}
          onClick={() => handleAudioPaly(sound)}
        >
          <audio className="clip" src={sound.url} id={sound.keyTrigger}></audio>
          {sound.keyTrigger}
        </button>
      </div>
    );
  });
};

const Display = () => {
  const { key } = useContext(KeyContext);
  return (
    <div id="display">
      <h1>{key}</h1>
    </div>
  );
};

const App = () => {
  return (
    <>
      <KeyContextProvider>
        <div id="drum-machine">
          <Keyboard />
          <Display />
        </div>
      </KeyContextProvider>
    </>
  );
};
export default App;
