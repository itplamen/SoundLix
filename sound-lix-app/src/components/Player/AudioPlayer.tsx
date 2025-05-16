"use client";

import { useAppDispatch, useAppSelector } from "@/app/state/hooks";
import { SongItemDetailsView } from "@/models/views";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import LoopIconType from "../Icons/Types/LoopIconType";
import PreviousIconType from "../Icons/Types/PreviousIconType";
import PlayIconType from "../Icons/Types/PlayIconType";
import NextIcontType from "../Icons/Types/NextIcontType";
import MoreIconType from "../Icons/Types/MoreIconType";
import Icon from "../Icons/Icon";
import {
  loop,
  more,
  next,
  pause,
  play,
  previous,
} from "../Icons/Types/IconTypeContent";
import CircleButton from "../Buttons/CircleButton";
import PauseIconType from "../Icons/Types/PauseIconType";
import { playSong } from "@/app/state/slices/audioPlayerSlice";

// Helper to format time (mm:ss)
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const AudioPlayer = () => {
  const dispatch = useAppDispatch();

  const currentSong: SongItemDetailsView = useAppSelector(
    (state) => state.audioPlayer.currentSong
  );

  const audioRef = useRef<HTMLAudioElement>(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentSong?.src) {
      if (currentSong.isPlaying) {
        onPlay();
      } else {
        onPause();
      }
    }
  }, [currentSong?.src, currentSong.isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Time tracking
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentSong?.src]);

  const onPlay = () => {
    const audio = audioRef.current;
    if (audio && currentSong?.src) {
      audio.play();
      dispatch(
        playSong({
          currentSong: {
            ...currentSong,
            isPlaying: true,
          },
        })
      );
    }
  };

  const onPause = () => {
    const audio = audioRef.current;
    if (audio && currentSong?.src) {
      audio.pause();
      dispatch(
        playSong({
          currentSong: {
            ...currentSong,
            isPlaying: false,
          },
        })
      );
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleLoop = () => {
    setIsLooping((prev) => !prev);
  };

  const toggleOptionsMenu = () => {
    setShowOptionsMenu((prev) => !prev);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-gray-800 p-3 rounded-t-lg shadow-lg">
      <div className="flex items-center w-full">
        {/* Left Side: Image and Title */}
        <div className="flex items-center gap-4 flex-shrink-0 w-1/3 p-2">
          {/* Cover Image */}
          <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-700 shadow-md flex-shrink-0">
            {currentSong?.image ? (
              <Image
                src={currentSong.image}
                alt="Track Cover"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                <span className="text-white text-xs">No Song</span>
              </div>
            )}
          </div>

          {/* Song Info */}
          <div className="flex flex-col max-w-[200px] overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">
              {currentSong?.name || "No song selected"}
            </p>
            <small className="text-xs text-gray-400 truncate">
              {currentSong?.subheading || "Select a song to play"}
            </small>
          </div>
        </div>

        {/* Centered Buttons Section */}
        <div className="flex items-center justify-center gap-2 flex-1 w-1/3 p-2">
          {/* Loop Button */}

          <CircleButton>
            <Icon content={loop}>
              <LoopIconType />
            </Icon>
          </CircleButton>

          <CircleButton>
            <Icon content={previous}>
              <PreviousIconType />
            </Icon>
          </CircleButton>

          <CircleButton
            size={10}
            onClick={currentSong.isPlaying ? onPause : onPlay}
          >
            <Icon content={currentSong.isPlaying ? pause : play} size={6}>
              {currentSong.isPlaying ? <PauseIconType /> : <PlayIconType />}
            </Icon>
          </CircleButton>

          <CircleButton>
            <Icon content={next}>
              <NextIcontType />
            </Icon>
          </CircleButton>

          <CircleButton>
            <Icon content={more}>
              <MoreIconType />
            </Icon>
          </CircleButton>
        </div>

        {/* Right Side: Volume Control */}
        <div className="items-center gap-4 flex justify-between w-1/3 p-2">
          {/* Volume Control */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-l h-1 bg-gray-600 rounded-full accent-gray-100 ml-auto"
            title="Volume"
            disabled={!currentSong}
          />
        </div>
      </div>

      {/* Center: Controls and Progress Bar */}
      <div className="flex items-center w-full text-xs text-gray-400 mt-1">
        {/* Progress Bar and Time */}
        <span className="mr-2">{formatTime(currentTime)}</span>
        <div className="w-full mx-2">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-full accent-gray-100"
            disabled={!currentSong}
          />
        </div>
        <span className="ml-2">{formatTime(duration)}</span>
      </div>

      {/* Options Menu */}
      {showOptionsMenu && (
        <div className="absolute top-0 right-0 mt-2 w-48 bg-gray-800 text-white p-2 rounded-lg shadow-md">
          <ul>
            <li className="py-1 text-sm cursor-pointer hover:bg-gray-700 px-2">
              Shuffle
            </li>
            <li className="py-1 text-sm cursor-pointer hover:bg-gray-700 px-2">
              Equalizer
            </li>
            <li className="py-1 text-sm cursor-pointer hover:bg-gray-700 px-2">
              Settings
            </li>
          </ul>
        </div>
      )}

      <audio ref={audioRef} src={currentSong?.src || ""} />
    </div>
  );
};

export default AudioPlayer;
