import { Link } from "react-router-dom";
import React, { ReactComponentElement } from "react";
import { Spinner } from "@material-tailwind/react";

export default function Loading() {
    return (
        <div className="loading-pane grid h-screen place-items-center dark:bg-slate-700">
          <Spinner className="h-12 w-12" />
        </div>
      )
}
