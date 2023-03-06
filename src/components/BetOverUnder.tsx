const BetOverUnder: React.FC<{
  bet: IGeneralBet;
  placedBet: PlacedBet;
}> = ({ bet, placedBet }) => {
  return (
    <div className="flex flex-col border">
      <span>{bet.label}</span>
      <div className="flex flex-row items-center">
        <div
          className={`flex flex-col ${
            placedBet?.choice === "over" ? "text-red-500" : ""
          }`}
        >
          <span>Över</span>
          <span>{bet.odds.over}</span>
        </div>
        <div
          className={`flex flex-col ${
            placedBet?.choice === "under" ? "text-red-500" : ""
          }`}
        >
          <span>Under</span>
          <span>{bet.odds.under}</span>
        </div>
        <span className="ml-4">{placedBet?.amount} kr</span>
      </div>
    </div>
  );
};

export default BetOverUnder;
