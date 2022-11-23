import { useRef, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import Button from '@mui/material/Button';

function RegisterProposal() {
  const { state } = useEth();
  const { state: { contract, accounts } } = useEth();
  const [value, setValue] = useState("?");
  const [text, setText] = useState("place");
  const [statusMessage, setStatusMessage] = useState("?");
  const [status, setStatus] = useState("?");
  const [workflowStatusDescription, setWorkflowStatusDescription] = useState();
  const [inputValue, setInputValue] = useState("");
  const [inputIdValue, setInputIdValue] = useState("");

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleInputIdChange = e => {
    setInputIdValue(e.target.value);
  };

const addProposal = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = inputValue;
    await contract.methods.addProposal(newValue).send({ from: accounts[0] });
  
  };

  const voteProposal = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputIdValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = inputIdValue;
    await contract.methods.setVote(newValue).send({ from: accounts[0] });
  
  };

  return (
    <div>
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
          <div >
          <br />
     
      
      
          <table border="0" cellpadding="0"> 
          <tr>
          <td><b>Register proposal</b></td>
          </tr>
           <tr>
          <td>Proposal description:</td>
          <td><input variant="contained" type="text" id="addProposal" width="600" value={inputValue} onChange={handleInputChange} /></td>
          <td><Button variant="contained" onClick={addProposal}>Register proposal</Button></td>
          </tr>
          </table>
          <br />

          <table border="0" cellpadding="0"> 
          <tr>
          <td><b>Vote </b></td>
          </tr>
           <tr>
          <td>Proposal Id:</td>
          <td><input variant="contained" type="text" id="voterProposal" width="600" value={inputIdValue} onChange={handleInputIdChange} /></td>
          <td><Button variant="contained" onClick={voteProposal}>Vote</Button></td>
          </tr>
          </table>

        
      
   
     
  
      
            </div>
      }
    </div>
  );
}

export default RegisterProposal;

