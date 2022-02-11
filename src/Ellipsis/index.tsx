import { FC, HTMLProps } from 'react';

interface IProps extends HTMLProps<HTMLDivElement> {
  placement?: "right" | "left"; 
  writingDirection?: "ltr" | "rtl";
}

const Ellipsis: FC<IProps> = ({
  style,
  placement = "right",
  writingDirection = "ltr",
  children,
  ...rest
}) => {
  return (
    <div 
      style={{
        // css for text overflow
        overflow: "hidden", 
        textOverflow: "ellipsis", 
        whiteSpace: "nowrap", 
        // set css direction to rtl in order to show ellipsis at left side can be dangerous,
        // for example: 163.net will be displayed as net.163
        // to fix this, use bdi element's dir attr to tell the browser the actual writing direction is ltr,
        // see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi
        direction: placement === "right" ? "ltr" : "rtl", 
        ...style 
      }} 
      {...rest}
    >
      <bdi dir={writingDirection}>{children}</bdi>
    </div>
  )
};

export default Ellipsis;
