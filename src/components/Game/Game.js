import React from "react";
import { MAX_MISTAKES } from "../../constants";
import {
  shuffleGameData,
  isGuessRepeated,
  isGuessCorrect,
} from "../../game-helpers";
import GameGrid from "../GameGrid";
import { SolvedWordRow } from "../GameGrid";
import NumberOfMistakesDisplay from "../NumberOfMistakesDisplay";
import Modal from "../Modal";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";
import ConfettiExplosion from "react-confetti-explosion";
import { sleep } from "../../utils";
import { Shuffle, Undo, SendHorizontal } from "lucide-react";

function Game({ gameData, setGameData }) {
  const [guessCandidate, setGuessCandidate] = React.useState([]);
  const [submittedGuesses, setSubmittedGuesses] = React.useState([]);
  const [shuffledRows, setShuffledRows] = React.useState(
    shuffleGameData({ gameData })
  );
  const [solvedGameData, setSolvedGameData] = React.useState([]);
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [modalData, setModalData] = React.useState({ open: false });
  const [gridShake, setGridShake] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);

  const categorySize = gameData[0].words.length;
  const numCategories = gameData.length;
  const numMistakesUsed = submittedGuesses.length - solvedGameData.length;

  const { toast } = useToast();

  // use effect to update Game Grid after a row has been correctly solved
  // end game if all rows have been solved
  React.useEffect(() => {
    if (solvedGameData.length === gameData.length) {
      const delayModalOpen = window.setTimeout(() => {
        setModalData({
          open: true,
          title: "You won the game!",
          description: "Great job, share your results!",
          isGameOver: true,
        });
      }, 2000);

      setIsGameOver(true);
      setShowConfetti(true);

      return () => window.clearTimeout(delayModalOpen);
    }
    const categoriesToRemoveFromRows = solvedGameData.map(
      (data) => data.category
    );
    const dataLeftForRows = gameData.filter((data) => {
      return !categoriesToRemoveFromRows.includes(data.category);
    });
    setShuffledRows(shuffleGameData({ gameData: dataLeftForRows }));
  }, [solvedGameData]);

  // use effect to check if all mistakes have been used and end the game accordingly
  React.useEffect(() => {
    if (numMistakesUsed < MAX_MISTAKES) {
      return;
    }

    setModalData({
      open: true,
      title: "You lost.",
      description: "Better luck next time.",
      isGameOver: true,
      extraElements: (
        <div className="grid gap-y-2">
          <p>The correct answers are below.</p>
          {gameData.map((obj) => (
            <SolvedWordRow key={obj.category} {...obj} />
          ))}
        </div>
      ),
    });

    setIsGameOver(true);
  }, [submittedGuesses]);

  function deselectAll() {
    setGuessCandidate([]);
  }

  function submitCandidateGuess() {
    // check that its a valid guess by size
    if (guessCandidate.length !== categorySize) {
      return;
    }
    // check that the guess hasnt already been submitted previously
    if (isGuessRepeated({ submittedGuesses, guessCandidate })) {
      toast({
        label: "Notification",
        title: "Repeated Guess",
        description: "You previously made this guess!",
      });

      return;
    }
    // add guess to state
    setSubmittedGuesses([...submittedGuesses, guessCandidate]);
    // check if the guess is correct
    const {
      isCorrect,
      correctWords,
      correctCategory,
      isGuessOneAway,
      correctDifficulty,
    } = isGuessCorrect({
      guessCandidate,
      gameData,
    });

    console.log({
      isCorrect,
      correctWords,
      correctCategory,
      isGuessOneAway,
      correctDifficulty,
    });

    // if the guess is correct:
    // set it as solved in game data
    if (isCorrect) {
      setSolvedGameData([
        ...solvedGameData,
        {
          category: correctCategory,
          words: correctWords,
          difficulty: correctDifficulty,
        },
      ]);
      const dataLeftForRows = gameData.filter((dataObj) => {
        return dataObj.category !== correctCategory;
      });
      setShuffledRows(shuffleGameData({ gameData: dataLeftForRows }));
      setGuessCandidate([]);
    } else {
      // Shake the grid to give feedback that they were wrong
      setGridShake(true);
      if (isGuessOneAway) {
        toast({
          label: "Notification",
          title: "Close Guess",
          description:
            "You we're one guess away from correctly guessing a category!",
        });
      }
    }
  }

  return (
    <>
      <h4 className="text-xl text-center mt-4">
        Create {numCategories} groups of {categorySize}
      </h4>

      <div className={`game-wrapper`}>
        <Modal title={modalData.title} initiallyOpen={modalData.open}>
          {modalData.description}
          {modalData.extraElements}
        </Modal>

        <GameGrid
          solvedGameData={solvedGameData}
          gameRows={shuffledRows}
          submittedGuesses={submittedGuesses}
          guessCandidate={guessCandidate}
          setGuessCandidate={setGuessCandidate}
          isGameOver={isGameOver}
          shouldGridShake={gridShake}
          setShouldGridShake={setGridShake}
        />
        {showConfetti && isGameOver && (
          <div className="grid place-content-center">
            <ConfettiExplosion particleCount={75} force={0.7} duration={2500} />
          </div>
        )}
        <Separator />
        <NumberOfMistakesDisplay
          maxMistakes={MAX_MISTAKES}
          numMistakesUsed={numMistakesUsed}
        />
        <div className="grid grid-cols-3 gap-4">
          <Button
            disabled={isGameOver}
            variant="secondary"
            onClick={() =>
              setShuffledRows(shuffleGameData({ gameData: shuffledRows }))
            }
          >
            <Shuffle className="h-4 w-4 mr-2" strokeWidth={1} />
            <p className="select-none">Shuffle</p>
          </Button>
          <Button
            disabled={isGameOver}
            variant="secondary"
            onClick={deselectAll}
          >
            <Undo className="h-4 w-4 mr-2" strokeWidth={1} />
            <p className="select-none">Deselect All</p>
          </Button>
          <Button
            variant="submit"
            onClick={submitCandidateGuess}
            disabled={isGameOver || guessCandidate.length !== categorySize}
          >
            <SendHorizontal className="h-4 w-4 mr-2" strokeWidth={1} />
            <p className="select-none">Submit</p>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Game;