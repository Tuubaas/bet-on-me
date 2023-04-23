import { useFormContext } from "react-hook-form";
import { type BetOverUnder } from "types";

const BetOverUnderAdmin: React.FC<{
  bet: BetOverUnder;
  index: number;
  onRemove: () => void;
}> = ({ bet, index, onRemove }) => {
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
              defaultValue={bet.typeOverUnder.over}
              {...register(`${index}.odds.over`)}
            />
          </div>
          <div>
            <label>Under: </label>
            <input
              className="border"
              defaultValue={bet.typeOverUnder.under}
              {...register(`${index}.odds.under`)}
            />
          </div>
        </div>
      </div>
      <button className="ml-12" onClick={onRemove}>
        Removed
      </button>
    </div>
  );
};

export default BetOverUnderAdmin;
