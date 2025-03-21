const ValleLogo = () => {
  return (
    <div className="flex h-14 items-center justify-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      <span className="ml-2 text-xl font-bold text-emerald-600">Valle</span>
    </div>
  )
}
export default ValleLogo
