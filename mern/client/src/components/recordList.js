import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  <div id="SkateParks" >
      <div style={{display: "inline-block", verticalAlign: "top"}}>
        <img src={props.record.imagelink} style={{ borderRadius: `3%`, objectFit: `cover`, }} width= "700px" height= "400px" ></img>
      </div>
      <div style={{display: "inline-block"}}>
        <div style={{marginLeft: "200PX"}}>
          <h4>{props.record.name}</h4>
        </div >
        
        <h6 style={{display: "inline", marginLeft: "200px"}}>Address: </h6>
        <p style={{display: "inline"}}>
            {props.record.address.street} {props.record.address.city} {props.record.address.state}&nbsp;
            {props.record.address.zipcode} {props.record.level}
        </p>
        {/* <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Clips</Link> */}
      <div style={{marginLeft: "200px"}}>
        <tr>
          <td>Monday</td>
          <td>{props.record.hours.tuesday}</td>
        </tr>
        <tr>
          <td>Tuesday</td>
          <td>9:00 AM - 5:00 PM</td>
        </tr>
        <tr>
          <td>Wednesday</td>
          <td>9:00 AM - 5:00 PM</td>
        </tr>
        <tr>
          <td>Thursday</td>
          <td>9:00 AM - 7:00 PM</td>
        </tr>
        <tr>
          <td>Friday</td>
          <td>9:00 AM - 7:00 PM</td>
        </tr>
        <tr>
          <td>Saturday</td>
          <td>10:00 AM - 4:00 PM</td>
        </tr>
        <tr>
          <td>Sunday</td>
          <td>Closed</td>
        </tr>
      </div>
    </div>
  </div>
);

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
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h2 style={{textAlign: "center", color: "white"}}>Skate Park Flexin</h2>
      <div style={{backgroundColor: "#579390", marginTop: "50px", paddingRight: "0px", marginRight: "0px"}}>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          {/* <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>Action</th>
          </tr> */}
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
      </div>
    </div>
  );
}
