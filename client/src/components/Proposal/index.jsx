import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import Status from "../Common/Status";

import RegisterProposal from "./RegisterProposal";
import ListProposal from "./ListProposal";

function Proposal() {
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
  <RegisterProposal />

  <ListProposal />
  </div>
 


      }
    </div>
  );
}

export default Proposal;

