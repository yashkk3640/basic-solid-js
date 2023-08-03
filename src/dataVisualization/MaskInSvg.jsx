const HEIGHT = 700;
const WIDTH = 1200;

const HALF_H = HEIGHT / 2;
const HALF_W = WIDTH / 2;

const MaskInSvg = () => {
  return (
    <div class="my-2">
      {/* <div class="fs-4 fw-bold">Mask In Svg</div> */}
      <svg width={WIDTH} height={HEIGHT}>
        <mask id="circle-1">
          <rect y={0} width={WIDTH} height={HEIGHT} fill="black"></rect>
          <circle cy={HALF_H} cx={HALF_W} r={250} fill="white" />
        </mask>
        <mask id="circle-2">
          <rect y={0} width={WIDTH} height={HEIGHT} fill="white"></rect>
          <circle cy={HALF_H} cx={HALF_W} r={250} fill="black" />
        </mask>
        {Array.from({ length: HEIGHT / 10 }).map((_, pos) => (
          <rect y={pos * 20} width={WIDTH} height={10} mask="url(#circle-1)" />
        ))}
        {Array.from({ length: WIDTH / 10 }).map((_, pos) => (
          <rect x={pos * 20} width={10} height={HEIGHT} mask="url(#circle-2)" />
        ))}
      </svg>
    </div>
  );
};

export default MaskInSvg;
