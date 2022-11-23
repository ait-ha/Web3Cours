import { useRef, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import Button from '@mui/material/Button';

function ListProposal() {
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
  const [tableReactElements, setTableReactElements] = useState();


  const refreshProposalTable = async e => { 
    let elements = await getTableBodyAsReactElement();
    setTableReactElements(elements);
  }

  const getListProposal = async () => {

    let data = []
    let count = await contract.methods.getProposalCount().call();
  
    for (let i = 0; i < count; i++) { 
        let prop = await contract.methods.getOneProposal(i).call();
        let obj = {Id : i, Descr : prop.description};
        console.log("count" + obj);
        data.push(obj );
      }
  return data;
  };

  async function getTableBodyAsReactElement() {
    let inv =   await getListProposal();

    return (!inv) ? null : (
      <tbody>
        {inv.map((item) => {                                // changed here
          
          return (
            <tr>
                  {Object.entries(item).map((field) => {        // changed here
        
                return  <td>{field[1]}</td>
              })}
             
            </tr>
          );
        })}
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
        
          <td><Button onClick={refreshProposalTable}><b>List Proposals</b></Button></td>
          </tr>
          <tr>
    
      
          </tr>
          <tr>
        
          <td>
          <table id='oldvotersTable' border={1}>
            <tr><td>Proposal Id</td><td>Description</td></tr>
          {tableReactElements}
          </table>
          </td>
          </tr>
          </table>
          
      
            </div>
      }
    </div>
  );
}

export default ListProposal;

