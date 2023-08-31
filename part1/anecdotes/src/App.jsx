import { useState } from "react";

const Display = ({ anecdotes, selected, text, scores, winner }) => {
  if (winner) {
    const findWinner = scores.indexOf(winner);
    return (
      <div>
        <h1>{text}</h1>
        <p>
          {anecdotes[findWinner]}
          <br />
          has {winner} votes
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>{text}</h1>
      <p>
        {anecdotes[selected]}
        <br />
        has {scores[selected]} votes
      </p>
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [scores, setScores] = useState(new Array(anecdotes.length).fill(0));
  const [winner, setWinner] = useState(0);
  const handleAnecdotes = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleScores = () => {
    const copy = [...scores];
    copy[selected] += 1;
    setScores(copy);
    const updatedWin = Math.max(...copy);

    setWinner(updatedWin);
  };

  return (
    <div>
      <Display
        anecdotes={anecdotes}
        selected={selected}
        text="Anecdote of the day"
        scores={scores}
      />
      <Button handleClick={handleScores} text="vote" />
      <Button handleClick={handleAnecdotes} text="next anecdotes" />
      <Display
        anecdotes={anecdotes}
        selected={selected}
        text="Anecdote with most votes"
        winner={winner}
        scores={scores}
      />
    </div>
  );
};

export default App;
