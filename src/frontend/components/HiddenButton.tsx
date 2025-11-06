import { useRef } from "react";

function HiddenButton({ open }: { open: () => void }) {
  const isClickRef = useRef<number>(0);
  const timerRef = useRef<number>(null);
  const onClick = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      isClickRef.current = 0;
    }, 500);

    isClickRef.current++;

    if (isClickRef.current > 9) {
      open();
      isClickRef.current = 0;
    }

    console.log(isClickRef.current);
  };
  return (
    <div
      onClick={onClick}
      className="bg-none fixed bottom-0 left-0 w-15 h-15"
    />
  );
}

export default HiddenButton;
