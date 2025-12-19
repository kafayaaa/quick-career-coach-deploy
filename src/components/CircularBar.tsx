import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  const [animatedValue, setAnimatedValue] = React.useState(0);

  // ANIMASI: dari 0 ke props.value
  React.useEffect(() => {
    let start: number | null = null;
    const duration = 500;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      const newValue = Math.min(
        props.value,
        (progress / duration) * props.value
      );

      setAnimatedValue(parseFloat(newValue.toFixed(0)));

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [props.value]);

  return (
    <Box className="relative w-full h-full flex items-center justify-center cursor-default hover:scale-110 transition-all duration-300 ease-out">
      {/* Background circle */}
      <CircularProgress
        className={`absolute left-0 !w-full !h-full !text-zinc-300 dark:!text-zinc-500`}
        variant="determinate"
        value={100}
        thickness={3}
        sx={{
          "& .MuiCircularProgress-circle": {
            stroke: "currentColor",
          },
        }}
      />

      {/* Animated foreground circle */}
      <CircularProgress
        variant="determinate"
        thickness={3}
        value={animatedValue}
        className={`!w-full !h-full ${
          animatedValue < 50
            ? "!text-rose-500"
            : animatedValue <= 75
            ? "!text-amber-500"
            : "!text-emerald-500"
        }`}
        sx={{
          "& .MuiCircularProgress-circle": {
            stroke: "currentColor",
          },
        }}
      />

      {/* Animated text */}
      <Box className="inset-0 absolute flex items-center justify-center">
        <Typography
          variant="caption"
          component="div"
          className={`${
            animatedValue < 50
              ? "!text-rose-500"
              : animatedValue <= 75
              ? "!text-amber-500"
              : "!text-emerald-500"
          } !font-bold !text-3xl !font-sora`}
        >
          {animatedValue}
        </Typography>
      </Box>
    </Box>
  );
}

export default function CircularWithValueLabel({ value }: { value: number }) {
  return <CircularProgressWithLabel value={value} />;
}
