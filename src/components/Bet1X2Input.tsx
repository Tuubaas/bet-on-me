import { type UseFormRegister } from "react-hook-form";

const Bet1X2Input: React.FC<{
  bet: IGeneralBet;
  placedBet: PlacedBet;
  register: UseFormRegister<IGeneralPlacedBets>;
}> = ({ bet, placedBet, register }) => {
  return (
    <div className="flex flex-col border">
      <span>{bet.label}</span>
      <div className="flex flex-row items-center">
        <div className="flex flex-col">
          <label>1</label>
          <input
            type="radio"
            {...register(`${bet.id}.choice`)}
            value="one"
            //checked={placedBet?.choice === "one"}
          />
          <span>{bet.odds.one}</span>
        </div>
        <div className="flex flex-col">
          <label>X</label>
          <input
            type="radio"
            {...register(`${bet.id}.choice`)}
            value="x"
            //checked={placedBet?.choice === "x"}
          />
          <span>{bet.odds.x}</span>
        </div>
        <div className="flex flex-col">
          <label>2</label>
          <input
            type="radio"
            {...register(`${bet.id}.choice`)}
            value="two"
            //checked={placedBet?.choice === "two"}
          />
          <span>{bet.odds.two}</span>
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

export default Bet1X2Input;
