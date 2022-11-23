import { useRef, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import Button from '@mui/material/Button';

function ListVoters() {
  const { state } = useEth();
  const { state: { contract, accounts } } = useEth();
  const [value, setValue] = useState("?");
  const [text, setText] = useState("place");
  const [statusMessage, setStatusMessage] = useState("?");
  const [status, setStatus] = useState("?");
  const [workflowStatusDescription, setWorkflowStatusDescription] = useState();
  const [inputValue, setInputValue] = useState("");
  const spanEle = useRef(null);
  const [EventValue, setEventValue] = useState("");
  const [oldEvents, setOldEvents] = useState([]);


useEffect(() => {

    if (!contract) {
      return;
    } 
    (async function () {

       let oldEvents= await contract.getPastEvents('VoterRegistered', {
          fromBlock: 0,
          toBlock: 'latest'
        });
        let oldies=[];

        oldEvents.forEach(event => {
            oldies.push(event.returnValues.voterAddress);
        });
        setOldEvents(oldies);

        await contract.events.VoterRegistered({fromBlock:"earliest"})
        .on('data', event => {
          let lesevents = event.returnValues.voterAddress;
          setEventValue(lesevents);
        })          
        .on('changed', changed => console.log(changed))
        .on('error', err => console.log(err))
        .on('connected', str => console.log(str))
    })();
  }, [contract])

  const columns = [
    { field: "address", headerName: "#Address" },
]

function getTableBodyAsReactElement(inv) {

    
    return (!inv) ? null : ( 
      <tbody> 
      {
        inv.map(item => {          
          return (
            <tr> 
            {
              Object.values(item).map(value => {
                return (<td>{value}</td>)
              })
            } 
            </tr>
          );
        })
      }
      </tbody>
    );
  }
 

  return (
    <div className="demo">
 
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
          <div >
      
          <br />
      
          <table border="0" cellpadding="0" id='user'> 
          <tr>
          <td><b>List Voters</b></td>
          </tr>
          <tr>
       <td><u>Last Voter :  {EventValue} </u></td>
          </tr>
          <tr>
          <td><u>Old Voters</u> :  
          <table id='oldvotersTable'>
          {getTableBodyAsReactElement(oldEvents)}
          </table>
          </td>
          </tr>
          </table>
      
            </div>
      }
    </div>
  );
}

export default ListVoters;

