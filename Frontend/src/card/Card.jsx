import { Avatar } from "@mui/material";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import VisibilityIcon from '@mui/icons-material/Visibility';


const CardVoter = ({ poll }) => {
  const [votes, setVotes] = useState(poll.options);

  const handleVote = (id) => {
    setVotes((prevVotes) =>
      prevVotes.map((option) =>
        option.id === id
          ? { ...option, votes: option.votes + 1 }
          : option
      )
    );
  };

  const totalVotes = votes.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="poll-card  shadow-sm p-3 bg-white">
      {/* Header Section */}
      <div className="d-flex align-items-center  mb-3">
        <Avatar className="me-3">{poll.name[0]}</Avatar>
        <div>
          <h5 className="mb-0 polls-name">{poll.name}</h5>
          <small className="text-muted polls-role">{poll.role}</small>
        </div>
        
      </div>

      {/* Question Section */}
      <h6 className="polls-question">{poll.question}</h6>
      <p className="text-muted mb-3"> <input type="radio" className=" polls-radio "  checked/><input type="radio" className="polls-radio "   checked/>   Select one or more</p>

      {/* Options Section */}
      {votes.map((option) => (
        <div key={option.id} className=" align-items-center mb-2">
          <label className="me-3">
            <input
              type="radio"
              name={`poll-${poll.id}`}
              onClick={() => handleVote(option.id)}
              className="me-2 polls-radio"
             
            />
            {option.text}
          </label>
              <small style={{float:"right"}}> {((option.votes / totalVotes) * 100).toFixed(0)}</small>
          <div className="progress-bar d-flex flex-grow-1 me-2 ">
                  {option.text === "Yes" ? (
                    <div
                      style={{
                        width: `${(option.votes / totalVotes) * 100}%`,
                      }}
                      className="progress bg-success"
                    ></div>
                  ) : (
                    <div
                      style={{
                        width: `${(option.votes / totalVotes) * 100}%`,
                      }}
                      className="progress bg-danger"
                    ></div>
                  )}
                </div>
        </div>
      ))}

      {/* Footer */}
      <div className="text-end mt-3">
        <small className="text-muted">{poll.timestamp}</small>
      </div>
    </div>
  );
};

export default CardVoter;
