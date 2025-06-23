import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";

function Textspeech(props) {
  const { speak } = useSpeechSynthesis();

  const handleSpeak = () => {
    // Detect language based on character ranges
    const isHindi = /[\u0900-\u097F]/.test(props.text);
    const isTelugu = /[\u0C00-\u0C7F]/.test(props.text);

    let lang;
    if (isHindi) {
      lang = 'hi';
    } else if (isTelugu) {
      lang = 'te';
    } else {
      lang = 'en'; // Default to English
    }

    speak({ text: props.text, lang });
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-auto mt-4"
      onClick={handleSpeak}
    >
      Speak
    </button>
  );
}

export default Textspeech;
