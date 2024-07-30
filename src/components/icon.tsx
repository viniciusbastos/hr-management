import { Link } from "react-router-dom";
import type React from "react";
import { ReactComponentElement } from "react";

export default function Icon(props: {
  id: string;
  path?: string;
  color: string;
  children?: React.ReactNode;
  target?: React.ReactNode;
}) {
  return (
    <div className={`rounded-full p-4  ${props.color} mr-8 shadow-xl`}>
      <Link to={`/${props.path}/${props.id}`}>{props.children}</Link>
    </div>
  );
}
