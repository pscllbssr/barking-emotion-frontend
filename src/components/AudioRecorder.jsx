import * as React from 'react';
import {AudioRecorder as AR} from 'react-audio-voice-recorder';
import {useRef, useState} from "react";
import {EmotionChart} from "./EmotionChart";

//const mimeType = "audio/webm"
const mimeType = "audio/wav"
const baseURL = "http://localhost:5000"

export const AudioRecorder = () => {
    const [permission, setPermission] = useState(false);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const mediaRecorder = useRef(null);
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [jsonResponse, setJsonResponse] = useState(false);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, {type: mimeType});
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        setRecordingStatus("inactive");
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, {type: mimeType});
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            //setAudioChunks([]);
        };
    };

    const sendAudioToAPI = async () => {
        setProcessing(true);

        try {
            const audioBlob = new Blob(audioChunks, {type: 'audio/wav'});
            const formData = new FormData();
            formData.append('audio', audioBlob);

            // Adjust the URL based on your subdirectory
            const response = await fetch(baseURL + '/process-audio', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json()
            setJsonResponse(result)

            // ...
        } catch (error) {
            console.error('Error sending audio to API:', error);
        } finally {
            //setJsonResponse(response)
            setProcessing(false);
        }
    };

    const deleteAudio = () => {
        setAudio(null)
        setJsonResponse(null)
    }

    return (
        <div>
            <div className="audio-controls">
                {!permission ? (
                    <button onClick={getMicrophonePermission} type="button"
                            className={'bg-gray-100 p-2 rounded shadow-sm'}>
                        Click to allow the browser to record audio
                    </button>
                ) : null}
                {permission && recordingStatus === "inactive" && !audio ? (
                    <button onClick={startRecording} type="button" className={'bg-red-100 p-2 rounded shadow-sm'}>
                        <span className={'inline-block rounded-lg bg-red-500 w-3 h-3 mx-1 '}></span>
                        Start Recording
                    </button>
                ) : null}
                {recordingStatus === "recording" ? (
                    <button onClick={stopRecording} type="button" className={'bg-gray-200 p-2 rounded shadow-sm'}>
                        <span className={'inline-block bg-gray-900 w-3 h-3 m-1'}></span>
                        Stop Recording
                    </button>
                ) : null}
            </div>
            {audio ? (
                <div className={'w-full my-2'}>
                    <div className={'p-4 flex justify-center'}>
                        <audio src={audio} controls></audio>
                    </div>
                    <div>
                        <button onClick={sendAudioToAPI}
                                className={'inline-block rounded border border-gray-500 px-3 py-2 shadow-md m-2'}>
                            🔎 Analyse Recording
                        </button>
                        <button onClick={deleteAudio}
                                className={'inline-block rounded bg-gray-100 px-3 py-2 shadow-sm m-2'}>
                            ❌ Delete Recording
                        </button>
                    </div>
                </div>
            ) : null}
            {
                audio && jsonResponse && <div>
                    <EmotionChart result={jsonResponse.result}/>
                </div>
            }
        </div>
    );
}