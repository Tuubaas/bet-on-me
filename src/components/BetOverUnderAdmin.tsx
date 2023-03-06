import { useFormContext } from "react-hook-form";

const BetOverUnderAdmin: React.FC<{
  bet: IBetOverUnder;
  index: number;
  removeBet: () => void;
}> = ({ bet, index, removeBet }) => {
  const { register } = useFormContext();
  return (
    <div className="mb-8 flex flex-row items-center">
      <div className="flex flex-col">
        <label>What is the bet?</label>
        <input
          className="border"
          defaultValue={bet.label}
          {...register(`${index}.label`)}
        />
        Odds:
        <div className="flex flex-col">
          <div>
            <label>Over: </label>
            <input
              className="border"
              defaultValue={bet.odds.over}
              {...register(`${index}.odds.over`)}
            />
          </div>
          <div>
            <label>Under: </label>
            <input
              className="border"
              defaultValue={bet.odds.under}
              {...register(`${index}.odds.under`)}
            />
          </div>
        </div>
      </div>
      <button className="ml-12" onClick={removeBet}>
        Removed
      </button>
    </div>
  );
};

export default BetOverUnderAdmin;
