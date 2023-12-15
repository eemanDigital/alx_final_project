"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container max-auto">
      <h4 className="font-heading text-red-800 mb-10">Something Went Wrong</h4>
      <button onClick={() => reset()} className="btn-primary">
        Try Again
      </button>
    </div>
  );
}
