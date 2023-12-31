
function LoadingButton({
  load,
  buttonText,
  buttonClassName,
}: {
  load: boolean;
  buttonText: string;
  buttonClassName: string;
}) {
  return (
    <button
      className={` w-full px-4 outline-none py-2 focus: rounded flex items-center justify-center ${buttonClassName}`}
    >
      {load && (
        <svg
          className="animate-spin h-5 w-5 mr-3"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!load ?  buttonText  : "Loading"}
    </button>
  );
}

export default LoadingButton;
