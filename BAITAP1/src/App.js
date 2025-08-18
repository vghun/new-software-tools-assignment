import './App.css';
import avatar from './assets/avatar.jpg';
import React, { useState } from 'react';

function Avatar(props) {
  return (
    <div className="avatar">
      <img src={props.info.path} alt="Avatar" />
    </div>
  );
}

function MemberInfo(props) {
  return (
    <div className="info">
      <h2>{props.info.name}</h2>
      <p><strong>MSSV:</strong> {props.info.mssv}</p>
      <p><strong>Chuyên ngành:</strong> {props.info.major}</p>
      <p><strong>Email:</strong> {props.info.email}</p>
    </div>
  );
}

// Comment Component
function Comment(props) {
  return (
    <div className="comment">
      {props.text}
    </div>
  );
}


function App() {
  const [member] = useState({
    text: "Sinh viên trường Đại học Sư phạm Kỹ thuật TP.HCM",
    info: {
      path: avatar,
      name: "Nguyễn Văn Hưng",
      mssv: "22110339",
      major: "Công nghệ phần mềm",
      email: "22110339@student.hcmute.edu.vn"
    }
  });

  return (
    <div className="App">
      <h1>Personal Information</h1>
      <Avatar info={member.info} />
      <MemberInfo info={member.info} />
      <Comment text={member.text} />
    </div>
  );
}

export default App;
