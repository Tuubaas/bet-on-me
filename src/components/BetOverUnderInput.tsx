import { type UseFormRegister } from "react-hook-form";

const BetOverUnderInput: React.FC<{
  bet: IGeneralBet;
  placedBet: PlacedBet;
  register: UseFormRegister<IGeneralPlacedBets>;
}> = ({ bet, placedBet, register }) => {
  return (
    <div className="flex flex-col border">
      <span>{bet.label}</span>
      <div className="flex flex-row items-center">
        <div className={`flex flex-col`}>
          <label>Över</label>
          <input
            type="radio"
            {...register(`${bet.id}.choice`)}
            value="over"
            checked={placedBet?.choice === "over"}
          />
        </div>
        <div className={`flex flex-col`}>
          <label>Under</label>
          <input
            type="radio"
            {...register(`${bet.id}.choice`)}
            value="under"
            checked={placedBet?.choice === "under"}
          />
        </div>
        <input
          defaultValue={placedBet?.amount}
          className="ml-4 border text-right"
          type="text"
          {...register(`${bet.id}.amount`)}
        />
        kr
      </div>
    </div>
  );
};

export default BetOverUnderInput;
