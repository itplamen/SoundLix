"use client";

import { useAppDispatch, useAppSelector } from "@/app/state/hooks";
import { SongItemDetailsView } from "@/models/views";
import Image from "next/image";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import LoopIconType from "../Icons/Types/LoopIconType";
import PreviousIconType from "../Icons/Types/PreviousIconType";
import PlayIconType from "../Icons/Types/PlayIconType";
import NextIcontType from "../Icons/Types/NextIcontType";
import MoreIconType from "../Icons/Types/MoreIconType";
import Icon from "../Icons/Icon";
import Button from "../Buttons/Button";
import PauseIconType from "../Icons/Types/PauseIconType";
import {
  getCurrentSong,
  pauseSong,
  playNextSong,
  playPrevSong,
  playSong,
} from "@/app/state/slices/audioPlayerSlice";
import VolumeUpIconType from "../Icons/Types/VolumeUpIconType";
import VolumeDownIconType from "../Icons/Types/VolumeDownIconType";
import VolumeMuteIconType from "../Icons/Types/VolumeMuteIconType";
import { formatTime } from "@/utils/formatters";
import { BUTTON_ROUND, BUTTON_TEXT, COLOR } from "@/utils/constants";

const VOLUME_CONFIG = {
  MIN: 0,
  MAX: 1,
  STEP: 0.01,
} as const;

const AudioPlayer = () => {
  const dispatch = useAppDispatch();

  const currentSong: SongItemDetailsView = useAppSelector(getCurrentSong);
  const songQueue: SongItemDetailsView[] = useAppSelector(
    (state) => state.audioPlayer.songs
  );

  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.src) return;

    if (currentSong.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [currentSong?.src, currentSong?.isPlaying]);

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

  const handleSongEnded = () => {
    // onPause or playlist
  };

  const handleVolume = (
    value: number
  ): MouseEventHandler<HTMLButtonElement> => {
    return (e) => {
      setVolume(value);
    };
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

          <Button
            text={BUTTON_TEXT.REPEAT}
            size={{ width: 6, height: 6 }}
            rounded={BUTTON_ROUND.MAX}
            bgColor={COLOR.LIGHT_GRAY}
            hoverColor={COLOR.WHITE}
          >
            <Icon color={COLOR.DARK_GRAY}>
              <LoopIconType />
            </Icon>
          </Button>

          <Button
            text={BUTTON_TEXT.PREVIOUS}
            size={{ width: 6, height: 6 }}
            rounded={BUTTON_ROUND.MAX}
            bgColor={COLOR.LIGHT_GRAY}
            hoverColor={COLOR.WHITE}
            onClick={() => dispatch(playPrevSong())}
          >
            <Icon color={COLOR.DARK_GRAY}>
              <PreviousIconType />
            </Icon>
          </Button>

          <Button
            text={currentSong.isPlaying ? BUTTON_TEXT.PAUSE : BUTTON_TEXT.PLAY}
            rounded={BUTTON_ROUND.MAX}
            size={{ width: 10, height: 10 }}
            bgColor={`${
              currentSong.isPlaying ? COLOR.WHITE : COLOR.LIGHT_GRAY
            }`}
            hoverColor={COLOR.WHITE}
            onClick={() =>
              dispatch(currentSong.isPlaying ? pauseSong() : playSong())
            }
          >
            <Icon color={COLOR.DARK_GRAY} size={6}>
              {currentSong.isPlaying ? <PauseIconType /> : <PlayIconType />}
            </Icon>
          </Button>

          <Button
            text={BUTTON_TEXT.NEXT}
            size={{ width: 6, height: 6 }}
            rounded={BUTTON_ROUND.MAX}
            bgColor={COLOR.LIGHT_GRAY}
            hoverColor={COLOR.WHITE}
            onClick={() => dispatch(playNextSong())}
          >
            <Icon color={COLOR.DARK_GRAY}>
              <NextIcontType />
            </Icon>
          </Button>

          <Button
            text={BUTTON_TEXT.MORE}
            size={{ width: 6, height: 6 }}
            rounded={BUTTON_ROUND.MAX}
            bgColor={COLOR.LIGHT_GRAY}
            hoverColor={COLOR.WHITE}
          >
            <Icon color={COLOR.DARK_GRAY}>
              <MoreIconType />
            </Icon>
          </Button>
        </div>

        <div className="flex items-center justify-end w-1/3 p-2 gap-2">
          <Button
            text={
              volume <= VOLUME_CONFIG.MIN
                ? BUTTON_TEXT.UNMUTE
                : BUTTON_TEXT.MUTE
            }
            rounded={BUTTON_ROUND.MAX}
            size={{ width: 6, height: 6 }}
            bgColor={`${
              volume > VOLUME_CONFIG.MIN ? COLOR.WHITE : COLOR.LIGHT_GRAY
            }`}
            onClick={handleVolume(
              volume <= VOLUME_CONFIG.MIN
                ? VOLUME_CONFIG.MAX
                : VOLUME_CONFIG.MIN
            )}
          >
            <Icon color={COLOR.DARK_GRAY}>
              {volume <= VOLUME_CONFIG.MIN ? (
                <VolumeMuteIconType />
              ) : volume > VOLUME_CONFIG.MIN &&
                volume < VOLUME_CONFIG.MAX / 2 ? (
                <VolumeDownIconType />
              ) : (
                <VolumeUpIconType />
              )}
            </Icon>
          </Button>
          <input
            type="range"
            min={VOLUME_CONFIG.MIN}
            max={VOLUME_CONFIG.MAX}
            step={VOLUME_CONFIG.STEP}
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-gray-600 rounded-full accent-gray-100"
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

      <audio
        ref={audioRef}
        src={currentSong?.src || ""}
        onEnded={handleSongEnded}
      />
    </div>
  );
};

export default AudioPlayer;
