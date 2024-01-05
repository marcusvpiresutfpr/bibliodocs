import React from "react";

type Props = {
  latex: string;
};

const Formula = (props: Props) => {
  return <div className="text-info">{String(props.latex)}</div>;
};

export default Formula;
