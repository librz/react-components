import { FC } from 'react'
import Ellipsis from './index'

const Example: FC = () => {
  return (
    <div>
      <h1>Ellipsis examples</h1>
      <div style={{ fontSize: 16, display: "flex", gap: 16, flexDirection: "column" }}>
        <Ellipsis style={{ width: 100 }}>
          How does it feel to be one of the beautiful people?
        </Ellipsis>
        <Ellipsis placement='left' style={{ maxWidth: 150 }}>
          this-is-a-very-long-url.com
        </Ellipsis>
      </div>
    </div>
  )
}

export default Example;
