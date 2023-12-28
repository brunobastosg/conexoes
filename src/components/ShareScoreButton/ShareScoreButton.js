import React from "react";
import { cn } from "../../lib/utils";
import Sparkles from "../Sparkles";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { shareStatus } from "../../lib/share-game";
import { GameStatusContext } from "../../providers/GameStatusProvider";
import { PuzzleDataContext } from "../../providers/PuzzleDataProvider";

function ShareScoreButton({ buttonText = "Compartilhar", className = "" }) {
  const { gameData } = React.useContext(PuzzleDataContext);
  const { submittedGuesses } = React.useContext(GameStatusContext);
  const { toast } = useToast();
  function handleShareToClipboard() {
    toast({
      label: "Notificação",
      title: "",
      description: "Copiado para a área de transferência!",
    });
  }
  function handleShareFailure() {
    toast({
      label: "Notificação",
      title: "",
      description: "Falha ao copiar para a área de transferência / compartilhar.",
    });
  }
  return (
    <Sparkles>
      <Button
        className={cn(className, "w-full")}
        variant="share"
        onClick={() =>
          shareStatus(
            gameData,
            submittedGuesses,
            handleShareToClipboard,
            handleShareFailure,
            true
          )
        }
      >
        {buttonText}
      </Button>
    </Sparkles>
  );
}

export default ShareScoreButton;
