import React from "react";
import BaseModal from "../BaseModal";
import { SolvedWordRow } from "../../GameGrid";
import ShareScoreButton from "../../ShareScoreButton";
import CountdownToNextPuzzle from "../../CountdownToNextPuzzle";
import { PuzzleDataContext } from "../../../providers/PuzzleDataProvider";

function GameLostModal({ open }) {
  const { gameData } = React.useContext(PuzzleDataContext);

  return (
    <BaseModal
      title="Você perdeu."
      initiallyOpen={open}
      footerElements={<ShareScoreButton />}
      showActionButton={false}
    >
      <div className="grid gap-y-2">
        <p className="text-lg font-[500] text-center">
          Boa sorte da próxima vez. As respostas corretas estão abaixo.
        </p>
        {gameData.map((obj) => (
          <SolvedWordRow key={obj.category} {...obj} />
        ))}
      </div>
      <CountdownToNextPuzzle />
    </BaseModal>
  );
}

export default GameLostModal;
