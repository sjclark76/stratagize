'use client';

interface Props {
  percentageComplete: number;
}
const ProgressCircle = ({ percentageComplete }: Props) => {
  const circumference = ((2 * 22) / 7) * 120;
  return (
    <div className="flex items-center justify-center">
      <svg className="transform -rotate-90 w-72 h-72">
        <circle
          cx="145"
          cy="145"
          r="120"
          stroke="currentColor"
          strokeWidth="30"
          fill="transparent"
          className="text-gray-700"
        />

        <circle
          cx="145"
          cy="145"
          r="120"
          stroke="currentColor"
          strokeWidth="30"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={
            circumference - (percentageComplete / 100) * circumference
          }
          className="text-purple-500"
        />
      </svg>
      <span className="absolute text-5xl">{percentageComplete}%</span>
    </div>
  );
};

export default ProgressCircle;
