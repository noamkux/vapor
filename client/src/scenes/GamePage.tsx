import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";

interface GamePageProps {}

const GamePage: FunctionComponent<GamePageProps> = () => {
  let { gameId } = useParams();

  return <>{gameId && <h1>{gameId}</h1>}</>;
};

export default GamePage;
