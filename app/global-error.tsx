'use client'

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2 className='text-secondary'>Something went wrong! {error.digest}</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
