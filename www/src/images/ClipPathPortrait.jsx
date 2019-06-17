// vendors
import React from "react"

const ClipPathPortrait = props => (
  <svg height="0" width="0" {...props}>
    <defs>
      <clipPath id="polygon-clip">
        <path d="M66 0L47 3 34 5l-5 2-15 15-7 7-2 4-5 29v5l13 26 6 7 7 4 21 10 2 1a350 350 0 0 0 35-6l8-7 7-7 7-8 4-6 5-28v-5l-13-26c-2-3-4-7-8-8l-6-4-19-9-2-1h-1" />
      </clipPath>
    </defs>
  </svg>
)

export default ClipPathPortrait
