// src/App.js
import React, { useRef, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

function App() {
  const [file, setFile] = useState(null);
  const [emails, setEmails] = useState([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("Write email here");
  const contentBody = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const emailList = data.map((row) => row[0]).filter((email) => email);
        setEmails(emailList);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleSendEmails = async () => {
    try {
      const dataEmail = emails.slice();
      dataEmail.shift();
      // const response = await axios.post("http://localhost:5000/send-emails", {
      //   emails,
      // });
      console.log("elaimm", contentBody.current.innerHTML);
      // console.log("Emails sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending emails:", error);
    }
  };

  return (
    <div className="App">
      <h1>Email Sender</h1>
      <input type="file" onChange={handleFileChange} />
      <br />
      <br />
      <button onClick={handleFileUpload}>Upload</button>
      <br />
      <br />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <br />
      <br />
      {/* <textarea
        cols={100}
        rows={10}
        placeholder="Body"
        value={body}f
        onChange={(e) => setBody(e.target.value)}
      /> */}
      <div
        style={{
          borderRadius: "2px",
          border: "1px solid black",
          width: "500px",
          height: "150px",
          overflowY: "scroll",
        }}
        ref={contentBody}
        onClick={() => {
          if (body === "Write email here") {
            setBody("");
          }
        }}
        contentEditable={true}
      >
        {body}
      </div>
      <br />
      <br />
      <button onClick={handleSendEmails}>Send Emails</button>
    </div>
  );
}

export default App;
