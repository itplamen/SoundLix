export const API = {
  MIN_RESULTS_LIMIT: 1,
  MAX_RESULTS_LIMIT: 200,
} as const;

export const VOLUME_CONFIG = {
  MIN: 0,
  MAX: 1,
  STEP: 0.01,
} as const;

export const BUTTON_TEXT = {
  PLAYLIST: "Add To Playlist",
  DOWNLOAD: "Download",
  WEBSITE: "Website",
  ENABLE_REPEAT: "Enable repeat",
  DISABLE_REPEAT: "Disable repeat",
  MORE: "More",
  NEXT: "Next",
  PLAY: "Play",
  PAUSE: "Pause",
  PREVIOUS: "Previous",
  MUTE: "Mute",
  UNMUTE: "Unmute",
} as const;

export const BUTTON_ROUND = {
  MAX: "rounded-full",
  LARGE: "rounded-lg",
} as const;
export type RoundedOption = (typeof BUTTON_ROUND)[keyof typeof BUTTON_ROUND];

export const COLOR = {
  NONE: "",
  LIGHT_GRAY: "gray-300",
  MEDIUM_GRAY: "gray-600",
  DARK_GRAY: "gray-800",
  WHITE: "white",
} as const;
export type ColorOption = (typeof COLOR)[keyof typeof COLOR];
