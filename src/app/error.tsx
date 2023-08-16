"use client"
const Error = ({error, reset}: {error: Error, reset: ()  => void}) => {
  return (
    <div>
      You got na Error.
      <button onClick={reset}>try again</button>
<h1>
    Cause of error{error.message}
</h1>
    </div>
  )
}

export default Error
