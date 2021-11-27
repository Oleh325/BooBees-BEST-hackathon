import './App.css';
import { Tldraw } from '@tldraw/tldraw'
import {
  Link
} from "react-router-dom";

function Drawroom() {

    function onChange(e) {
        console.log(e.copyJson());
    }

  return (
      <div>
          <div className={"Draw-container"}>
              <Tldraw showMenu={false} showPages={false} showSponsorLink={false} showZoom={false} onPersist={onChange}/>
          </div>
      </div>
  );
}

export default Drawroom;
