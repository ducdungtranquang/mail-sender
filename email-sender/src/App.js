// src/App.js
import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

function App() {
  const [file, setFile] = useState(null);
  const [emails, setEmails] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
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
  };

  const handleSendEmails = async () => {
    try {
      const response = await axios.post("http://localhost:5000/send-emails", {
        emails,
      });
      console.log("Emails sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending emails:", error);
    }
  };

  return (
    <div className="App">
      <h1>Email Sender</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      <button onClick={handleSendEmails}>Send Emails</button>
    </div>
  );
}

export default App;
