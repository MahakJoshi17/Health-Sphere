// File: App.jsx
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { jsPDF } from 'jspdf';

const socket = io('http://localhost:5000'); // Update with your server URL if needed

const VideoCallComponent = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);
  const [videoEnabled, setVideoEnabled] = useState(true);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localVideoRef.current.srcObject = localStream;
        setStream(localStream);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };
    getMedia();
  }, []);

  useEffect(() => {
    if (!stream) return;

    pcRef.current = new RTCPeerConnection();

    stream.getTracks().forEach((track) => {
      pcRef.current.addTrack(track, stream);
    });

    pcRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    pcRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', event.candidate);
      }
    };

    socket.on('offer', async (offer) => {
      if (!pcRef.current) return;
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);
      socket.emit('answer', answer);
    });

    socket.on('answer', async (answer) => {
      if (!pcRef.current) return;
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on('ice-candidate', async (candidate) => {
      try {
        await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error('Error adding received ice candidate', error);
      }
    });

    // Initiate room joining logic
    socket.emit('join-room');

    socket.on('ready', async () => {
      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);
      socket.emit('offer', offer);
    });
  }, [stream]);

  const toggleVideo = () => {
    stream.getVideoTracks()[0].enabled = !videoEnabled;
    setVideoEnabled(!videoEnabled);
  };

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    if (!isListening) {
      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = transcript;
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setTranscript(finalTranscript + interimTranscript);
      };
      recognition.start();
      recognitionRef.current = recognition;
      setIsListening(true);
    } else {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const downloadTranscriptAsPDF = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(transcript, 180);
    doc.text(lines, 10, 10);
    doc.save('transcript.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] to-[#e0f2f1] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-[#00695c]">🎥 Video Call with Live Speech-to-Text</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        <video ref={localVideoRef} autoPlay muted className="rounded-xl shadow-lg w-80 h-60 object-cover border-2 border-cyan-400" />
        <video ref={remoteVideoRef} autoPlay className="rounded-xl shadow-lg w-80 h-60 object-cover border-2 border-purple-400" />
      </div>
      <div className="mt-6 flex gap-4 flex-wrap justify-center">
        <button onClick={toggleVideo} className="bg-blue-500 px-4 py-2 rounded-xl shadow hover:bg-blue-600">
          {videoEnabled ? 'Turn Off Camera' : 'Turn On Camera'}
        </button>
        <button onClick={toggleListening} className={`px-4 py-2 rounded-xl shadow ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}>
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
        <button onClick={downloadTranscriptAsPDF} className="bg-yellow-500 px-4 py-2 rounded-xl shadow hover:bg-yellow-600">
          Download PDF
        </button>
      </div>
      <div className="mt-4 w-full max-w-2xl bg-white text-black p-4 rounded-xl shadow-inner">
        <h2 className="font-bold text-xl mb-2">📝 Live Transcript</h2>
        <p className="whitespace-pre-wrap break-words max-h-60 overflow-y-auto">{transcript || 'Start speaking to see transcript here...'}</p>
      </div>
    </div>
  );
};

export default VideoCallComponent;
