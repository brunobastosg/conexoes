import React from "react";

import { generateEmojiGrid } from "../../../lib/game-helpers";
import CountdownToNextPuzzle from "../../CountdownToNextPuzzle";
import ShareScoreButton from "../../ShareScoreButton";
import BaseModal from "../BaseModal";
import { GameStatusContext } from "../../../providers/GameStatusProvider";
import { PuzzleDataContext } from "../../../providers/PuzzleDataProvider";
import { Button } from "../../ui/button";

function ViewResultsModal() {
  const { submittedGuesses } = React.useContext(GameStatusContext);
  const { gameData } = React.useContext(PuzzleDataContext);

  return (
    <BaseModal
      title=""
      trigger={
        <Button variant="submit" className="w-full" children={"Visualizar Resultados"} />
      }
      initiallyOpen={false}
      showActionButton={false}
      footerElements={<ShareScoreButton buttonText={"Compartilhe Sua Pontuação!"} />}
    >
      <div className="flex flex-col place-content-center">
        <p className="text-center font-[600]">
          Seus Palpites Estão Representados Abaixo
        </p>
        <span className="text-center whitespace-pre mb-2">
          {"\n"}
          {generateEmojiGrid(gameData, submittedGuesses)}
        </span>
        <CountdownToNextPuzzle />
      </div>
    </BaseModal>
  );
}

export default ViewResultsModal;
