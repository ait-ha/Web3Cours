import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";

import AddVoter from "./AddVoter";
import Workflow from "./Workflow";
import ListVoters from "./ListVoters";
import Status from "../Common/Status";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Admin() {
  const { state } = useEth();
  const [value, setValue] = useState("?");
  const [text, setText] = useState("place");

 

  return (
    <div className="demo">
      
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :

          <div >
              <div >
  <Status />
  </div>
  <div >
  <AddVoter />
  </div>
  <div >
  <ListVoters />
  </div>
  <div >
  <Workflow />
  </div>
</div>

      }
    </div>
  );
}

export default Admin;

