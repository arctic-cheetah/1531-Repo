import { Button } from "@material-ui/core";
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness7Icon from '@material-ui/icons/Brightness7';


import React, {useContext} from "react";
import { DarkModeContext } from "../../DarkModeContext";

export default function DarkModeToggle () {
  let darkMode = useContext(DarkModeContext);

  return (
    <Button onClick={() => {darkMode.switchTheme()}}>
      {!darkMode.isDark ? <Brightness5Icon/> : <Brightness7Icon/>}
    </Button>
  );
}
