export const calculatePosition = (
  index: number,
  total: number,
  radius: number
) => {
  const angle = calculateAngle(index, total);
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  };
};

export const calculateAngle = (index: number, total: number) => {
  return (index / total) * 2 * Math.PI - Math.PI / 2; // Start at 12 o'clock
};
