import { FaMicrophone } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface SpeechToTextProps {
  setQueryCity: (text: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  setQuerySearch: (query: string | null) => void;
}

export default function SpeechToText({ setQueryCity, setIsOpen, setQuerySearch }: SpeechToTextProps) {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech Recognition not supported in this browser.", {
        duration: 5000,
        closeButton: true,
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQueryCity(transcript);
      setIsRecording(false);
      setQuerySearch(transcript);
      setIsOpen(true);
    };

    recognition.onerror = (event: any) => {
      toast.error("Speech recognition error", {
        description: event.message,
        duration: 5000,
        closeButton: true,
      });
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [setQueryCity, setIsOpen, setQuerySearch]);

  const handleRecognition = () => {
    const recognition = recognitionRef.current;

    if (!recognition) {
      toast.error("Speech Recognition not initialized");
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
      return;
    }

    try {
      recognition.start();
      setIsRecording(true);
      
    } catch (error: any) {
      toast.error("Error starting recognition", {
        description: error.message,
        duration: 5000,
        closeButton: true,
      });
      setIsRecording(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleRecognition}
      className={`group absolute inset-y-1.5 right-2.5 flex items-center px-3 py-4 rounded-lg
        transition-colors duration-200 active:scale-95
        ${isRecording ? "bg-red-500" : "bg-gray-200"}`}
    >
      <FaMicrophone
        size={25}
        className={`${isRecording ? "text-white" : "text-gray-700"} group-hover:scale-110 transition-transform duration-200`}
      />
    </button>
  );
}
