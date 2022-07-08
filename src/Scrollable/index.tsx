import React, { FC, HTMLProps } from 'react'
import classNames from 'classnames'
import { useCss } from 'react-use'

// ref: https://www.youtube.com/watch?v=lvKK2fs6h4I
// you may want to set scrollbar style globally instead of using this component

interface IProps extends HTMLProps<HTMLDivElement> {
  direction?: "horizontal" | "vertical",
  scrollbarThickness?: "auto" | "thin" | "none",
  thumbColor?: string
}

const Scrollable: FC<IProps> = ({
  className,
  direction = "vertical",
  scrollbarThickness = "auto",
  thumbColor = "#C1C1C1",
  ...restProps
}) => {
  
  const scrollClass = useCss({
    overflowY: direction === "vertical" ? "auto" : "visible", // visible is defautl style
    overflowX: direction === "vertical" ? "auto" : "visible",
    // firefox style
    scrollbarWidth: scrollbarThickness,
    scrollbarColor: `${thumbColor} inherit`,
    // webkit(chrome & safari) style
    '&::-webkit-scrollbar': {
      display: scrollbarThickness === "none" ? "none" : "block",
      width: scrollbarThickness === "thin" ? "6px" : "8px", // only affects width of vertical scroll bar
      height: scrollbarThickness === "thin" ? "6px" : "8px" // only affects height of horizontal scroll bar
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: scrollbarThickness === "thin" ? "3px" : "5px",
      backgroundColor: thumbColor,
    },
  });
  
	return (
		<div
      className={classNames(scrollClass, className)}
      {...restProps}
    />
	)
}

export default Scrollable