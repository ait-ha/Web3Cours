import { useRef, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Button from '@mui/material/Button';

function Status() {
  const { state } = useEth();
  const { state: { contract, accounts } } = useEth();
  const [value, setValue] = useState("?");
  const [text, setText] = useState("place");
  const [statusMessage, setStatusMessage] = useState("?");
  const [status, setStatus] = useState("?");
  const [workflowStatusDescription, setWorkflowStatusDescription] = useState();
  const [inputValue, setInputValue] = useState("");

  const refreshWorkflowStatus = async e => { 
   let obj = await contract.methods.getWorkflowStatus().call();
       switch(obj.toString())                   
       {
          case '0':
             setWorkflowStatusDescription("Registering Voters");
             break;
          case '1':
            setWorkflowStatusDescription("Proposals Registration Started");
             break;
        case '2':
            setWorkflowStatusDescription("Proposals Registration Ended");
            break;
        case '3':
            setWorkflowStatusDescription("Voting Session Started");
            break;
        case '4':
            setWorkflowStatusDescription("Voting Session Ended");
            break;
        case '5':
            setWorkflowStatusDescription("Votes Tallied");
            break;
             
          default:
            setWorkflowStatusDescription("Unknown Status");
      }
                    
} 



  return (
    <div>
      

          <div >
          <br />
          <table border="0" cellpadding="0" id='currentStatus'> 
           <tr>
          
                  <td><b><Button onClick={refreshWorkflowStatus}>Current status</Button></b></td>
                              <td id='currentWorkflowStatusMessage'>{workflowStatusDescription}</td>
                  <td></td>
                  <td></td>
           </tr>     
          </table>
          <br />

            </div>
      
    </div>
  );
}

export default Status;

