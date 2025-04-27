import { Radio } from "@/models/data";

type Props = {
  radio: Radio;
};

const RadioItem = ({ radio }: Props) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <a className="hexagon-content" href='/catalog?genre=["ambient/new age"]'>
        <div className="hexagon-box-shadow"></div>

        <svg width="168" height="186" viewBox="0 0 168 186" fill="none">
          <defs>
            <pattern
              id={radio.id}
              patternUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                href={radio.image}
                width="100%"
                height="100%"
                className="w-72 h-48 rounded-lg"
                preserveAspectRatio="xMidYMid slice"
              ></image>
            </pattern>
          </defs>
          <path
            d="M95.9073 182.196C88.529 186.412 79.4711 186.412 72.0927 182.196L12.0927 147.91C4.61488 143.637 0 135.685 0 127.072V58.9277C0 50.3152 4.61488 42.3629 12.0927 38.0899L72.0927 3.80419C79.471 -0.412034 88.5289 -0.412035 95.9073 3.80419L155.907 38.0899C163.385 42.3629 168 50.3152 168 58.9277V127.072C168 135.685 163.385 143.637 155.907 147.91L95.9073 182.196Z"
            fill={`url(#${radio.id})`}
          ></path>
        </svg>
      </a>
      <div className="flex flex-col items-center">
        <span className="text-md leading-5 font-semibold">{radio.name}</span>
        <span className="text-sm leading-5 font-medium text-accentTertiary">
          12219
        </span>
      </div>
    </div>
  );
};

export default RadioItem;
