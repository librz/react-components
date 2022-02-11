import { FC } from 'react'

interface IProps {
  condition: any
}

/* JSX enhance, show children if condition is trusy */

const If: FC<IProps> = ({ condition, children }) => {
  return condition ? <>{children}</> : null
}

export default If