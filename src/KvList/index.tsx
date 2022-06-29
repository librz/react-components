import { FC, CSSProperties, ReactNode } from 'react';
import { useCss } from 'react-use'

interface ComplexValue {
  content: ReactNode,
  required?: string,
  extra?: ReactNode,
  onClick?: () => void,
}

interface IProps {
  records: Record<string, ReactNode | ComplexValue>,
  withSeperator?: boolean,
  labelWidth?: number,
  style?: Partial<Record<"container" | "item" | "label" | "value", CSSProperties>>,
}

const KVList: FC<IProps> = ({ 
  records, 
  labelWidth, 
  withSeperator = false,
  style = {} 
}) => {

  const pairs = Object.entries(records);

  if (pairs.length === 0) return null;

  /* styles */

  const itemStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "12px 16px",
    fontSize: 16,
    minHeight: 56,
    ...style.item
  };

  const labelStyle: CSSProperties = {
    flexBasis: labelWidth || 120,
    flexGrow: labelWidth ? 0 : 1,
    flexShrink: labelWidth ? 0 : 0,
    ...style.label
  }
  
  const valueStyle: CSSProperties = {
    flexBasis: 120,
    flexGrow: 2,
    flexShrink: 0,
    wordBreak: "break-all",
    ...style.value
  }

  /* class names */

  const itemClassname = useCss({
    borderTop: withSeperator ? `1px solid #E8EBF1` : "none"
  })

  const itemHoverClassname = useCss({
    '&:hover': {
      cursor: "pointer",
      backgroundColor: "#E8EBF1",
    }
  })

  /* view */

  function renderSimpleRecord(index: number, label: string, value: ReactNode) {
    return (
      <div key={index} className={itemClassname} style={itemStyle}>
        <div style={labelStyle}>{label}</div>
        <div style={valueStyle}>{value}</div>
      </div>
    )
  }

  function renderComplexRecord(index: number, label: string, value: ComplexValue) {
    const { content, required, extra, onClick } = value;
    return (
      <div 
        key={index}
        onClick={onClick}
        className={`${itemClassname} ${onClick ? itemHoverClassname : ''}`} 
        style={itemStyle} 
      >
        <div style={labelStyle}>
          {label}
          {
            required &&
            <span style={{ color: "#D23E39", fontWeight: "normal", marginLeft: 8 }}>
              * required
            </span>
          }
        </div>
        <div style={valueStyle}>{content}</div>
        {
          extra &&
          <div style={{ width: "100%" }}>
            { extra }
          </div>
        }
      </div>
    )
  }

  return (
    <div style={style.container}>
      {
        pairs.map(([key, value], index) => {
           // early return
          if (!value) return null;
          // special record, render directly
          if (key === "") {
            return (
              <div key={index} className={itemClassname} style={itemStyle}>
                {value}
              </div>
            )
          }
          // normal (simple & complex record)
          const label = key;
          const isSimpleValue = (
            typeof value === "string" 
            || typeof value === "number" 
            || typeof value === "boolean" 
            || !('content' in value) // ReactNode doesn't have 'content' prop
          );
          if (isSimpleValue) return renderSimpleRecord(index, label, value)
          else return renderComplexRecord(index, label, value)
        })
      }
    </div>
  );
}

export default KVList;
