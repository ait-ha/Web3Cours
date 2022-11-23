import { useRef, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import Button from '@mui/material/Button';

function Workflow() {
  const { state } = useEth();
  const { state: { contract, accounts } } = useEth();
  const [value, setValue] = useState("?");
  const [text, setText] = useState("place");
  const [statusMessage, setStatusMessage] = useState("?");
  const [status, setStatus] = useState("?");
  const [workflowStatusDescription, setWorkflowStatusDescription] = useState();
  const [inputValue, setInputValue] = useState("");
  const [tallyVotesMessage, setTallyVotesMessage] = useState("");
  

  const startProposalsRegistering = async e => {

    try {
        await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
    } catch (e) {
        console.log("that failed", e); 
    }

  };

  const endProposalsRegistering = async e => {

    await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
  
  };

  const startVotingSession = async e => {

    try {
        await contract.methods.startVotingSession().send({ from: accounts[0] });
    } catch (e) {
        console.log("that failed", e); 
    }

  };


  const endVotingSession = async e => {

    try {
        await contract.methods.endVotingSession().send({ from: accounts[0] });
    } catch (e) {
        console.log("that failed", e); 
    }

  };
  
  const tallyVotesSession = async e => {

    try {
        await contract.methods.tallyVotes().send({ from: accounts[0] });
        let winnerId = await  contract.methods.getWinningProposalID().call();     
        setTallyVotesMessage("The winner Proposal Id " + winnerId);

    } catch (e) {
        console.log("that failed", e); 
    }

  };

  return (
    <div className="demo">
 
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
          <div >
      
          <br />
    
      
          <br />
      
      <table border="0" cellpadding="0" id='proposalsRegistration'> 
      <tr>
          <td colSpan={4}><b>Proposals registration session</b></td> 
          </tr>
           <tr>
               <td><Button variant="contained" onClick={startProposalsRegistering}>Start</Button></td><td></td>
             <td>  <Button variant="contained"  onClick={endProposalsRegistering}>End</Button></td>
               <td id='proposalsRegistrationMessage'></td>
            </tr>     
      </table>
      
      <br />
      <table border="0" cellpadding="0" id='votingSession'> 
      <tr>
          <td colSpan={4}><b>Voting session</b></td> 
          </tr>
           <tr>
               <td><Button variant="contained"  onClick={startVotingSession}>Start</Button> </td><td></td>
             <td>  <Button variant="contained"  onClick={endVotingSession}>End</Button></td>
               <td id='votingSessionMessage'></td>
            </tr>     
      </table>
      
      <br />
      <table border="0" cellpadding="0" id='tallyVotes'> 
      <tr>
          <td colSpan={4}><b>Tally Votes</b></td> 
          </tr>
           <tr>
               <td><Button variant="contained"  onClick={tallyVotesSession}>Tally votes</Button> </td>
               <td id='tallyVotesMessage'>{tallyVotesMessage}</td>
            </tr>     
      </table>
      
      
            </div>
      }
    </div>
  );
}

export default Workflow;

