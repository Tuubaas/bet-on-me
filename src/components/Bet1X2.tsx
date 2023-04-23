import { type Bet1X2, type PlacedBet } from "types";

const Bet1X2: React.FC<{
  bet: Bet1X2;
  placedBet: PlacedBet;
}> = ({ bet, placedBet }) => {
  return (
    <div className="flex flex-col border">
      <span>{bet.label}</span>
      <div className="flex flex-row items-center">
        <div
          className={`flex flex-col ${
            placedBet?.choice === "one" ? "text-red-500" : ""
          }`}
        >
          <span>1</span>
          <span>{bet.type1x2.one}</span>
        </div>
        <div
          className={`flex flex-col ${
            placedBet?.choice === "x" ? "text-red-500" : ""
          }`}
        >
          <span>X</span>
          <span>{bet.type1x2.x}</span>
        </div>
        <div
          className={`flex flex-col ${
            placedBet?.choice === "two" ? "text-red-500" : ""
          }`}
        >
          <span>2</span>
          <span>{bet.type1x2.two}</span>
        </div>
        <span className="ml-4">{placedBet?.amount} kr</span>
      </div>
    </div>
  );
};

export default Bet1X2;
