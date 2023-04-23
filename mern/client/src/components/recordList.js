import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './code.css';


const Record = (props) => {
  return (
    <table style={{ margin: "0px", width: "100%" }} class="table">
      <tbody>

          {console.log(props.record)}
          {props.tableSetter(props.record, props.i)}
      </tbody>
    </table>
  );
};





export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record, index) => {
      return (
        <Record
          record={record}
          key={record._id}
          i={index % 2 === 0 ? "right" : "left"}
          j={index % 2 === 0 ? "left" : "right"}
          tableSetter={(record, i) => tableSetter(record, i)}
        />
      );

    });
  }






  function tableSetter(props, lr)
  {
    console.log("Setter")
    console.log(lr)


    if (lr == "left")
    {
      return (<tr> {setImg(props, lr)}{setText(props, lr)}</tr>)
    }
    else{
       return (<tr> {setText(props, lr)}{setImg(props, lr)}</tr>)
    }
  }



  function setImg(props, lr) {

    console.log("img Set");
    return (
      <td className={lr} >
        <div>
          <img src={props.imagelink} style={{ borderRadius: `3%`, objectFit: `cover`, margin: "30px" }} width="1200px" height="700px" class="park-img"></img>
        </div>
      </td>
    );
  }


  function setText(props, lr) {
 
    console.log("setText")
    return (
      <td className="park-content-container">
      <h1>{props.name}</h1>
      <div className= "park-content">
      {props.address.street}<br />
      {props.address.city}<br />
      {props.address.state}<br />
      {props.address.zipcode}
      </div>

      <Link className="btn btn-link" to={`/edit/${props._id}`}>Clips</Link>


      <h1 >Times</h1>
      <div className="time-content">
      Monday: {props.hours.monday}<br />
      Tuesday: {props.hours.tuesday}<br />
      Wednesday: {props.hours.wednesday}<br />
      Thursday: {props.hours.thursday}<br />
      Friday: {props.hours.friday}<br />
      Saturday: {props.hours.saturday}<br />
      Sunday: { props.hours.sunday}<br />
      </div>
    </td>
    );
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h2 style={{textAlign: "center", color: "white"}}>Skate Park Flexin</h2>
      <div style={{backgroundColor: "#579390", marginTop: "50px", padding: "0px", margin: "0px", borderRadius: "50px 50px 0px 0px"}}>
      <h3></h3>
      {recordList()}
    </div>
    </div>
  );
}
