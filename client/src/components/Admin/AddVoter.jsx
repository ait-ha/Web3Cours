import { useRef, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import Button from '@mui/material/Button';

function AddVoter() {
  const { state } = useEth();
  const { state: { contract, accounts } } = useEth();
  const [value, setValue] = useState("?");
  const [text, setText] = useState("place");
  const [statusMessage, setStatusMessage] = useState("?");
  const [status, setStatus] = useState("?");
  const [workflowStatusDescription, setWorkflowStatusDescription] = useState();
  const [inputValue, setInputValue] = useState("");
  const [addVoterMessage, setAddVoterMessage] = useState("");
  

const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const handleAddressChange = e => {
    setInputValue(e.target.value);
  };


const addVoter = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    try {
    const newValue = inputValue;
    await contract.methods.addVoter(newValue).send({ from: accounts[0] });
    } catch (err) {
        setAddVoterMessage(err);
    }
  
  };

  return (
    <div>
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
          <div >
          <br />
     
      
      
          <table border="0" cellpadding="0" id='user'> 
          <tr>
          <td><b>Register voter</b></td>
          </tr>
           <tr>
          <td>Voter address:</td>
          <td><input variant="contained" type="text" id="voterAddress" width="600" value={inputValue} onChange={handleAddressChange} /></td>

          <td><Button variant="contained" onClick={addVoter}>Register</Button></td>
          <td id='addVoterMessage'>{addVoterMessage}</td>

         
          </tr>
          </table>
      
        
      
   
     
  
      
            </div>
      }
    </div>
  );
}

export default AddVoter;

