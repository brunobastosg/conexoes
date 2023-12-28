import React from "react";
import Countdown from "react-countdown";
import { dateOfNextPuzzle } from "../../lib/time-utils";

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  //ChatGPT Assisted
  // Render a countdown
  if (completed) {
    return (
      <span className="font-[600]">
        Novo jogo disponível! Atualize a página.
      </span>
    );
  }
  const timeParts = [];

  if (days > 0) {
    timeParts.push(`${days} Dia${days > 1 ? "s" : ""}`);
  }
  if (hours > 0) {
    timeParts.push(`${hours} Hora${hours > 1 ? "s" : ""}`);
  }
  if (minutes > 0) {
    timeParts.push(`${minutes} Minuto${minutes > 1 ? "s" : ""}`);
  }

  // Create a sentence based on the time parts
  let timeLeftString = "Próximo Jogo Será Lançado em ";
  if (timeParts.length > 2) {
    timeLeftString += timeParts.slice(0, -1).join(", ");
    timeLeftString += `, e ${timeParts.slice(-1)}`;
  } else if (timeParts.length == 2) {
    timeLeftString += `${timeParts[0]} e ${timeParts[1]}`;
  } else {
    timeLeftString += timeParts[0];
  }
  // Create a sentence based on the time parts

  return <div>{timeLeftString}</div>;
};

function CountdownToNextPuzzle() {
  return (
    <div className="flex flex-row place-content-center mt-4">
      <Countdown
        className="text-lg text-gray-900"
        renderer={renderer}
        date={dateOfNextPuzzle}
        intervalDelay={1000}
      />
    </div>
  );
}

export default CountdownToNextPuzzle;
