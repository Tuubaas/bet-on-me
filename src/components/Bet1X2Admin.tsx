import { useFormContext } from "react-hook-form";
import { type Bet1X2 } from "types";

const Bet1X2Admin: React.FC<{
  bet: Bet1X2;
  index: number;
  onRemove: () => void;
}> = ({ bet, index, onRemove }) => {
  const { register } = useFormContext();
  // console.log(bet);

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
            <label>1: </label>
            <input
              className="border"
              defaultValue={bet.type1x2.one}
              {...register(`${index}.odds.one`)}
            />
          </div>
          <div>
            <label>X: </label>
            <input
              className="border"
              defaultValue={bet.type1x2.x}
              {...register(`${index}.odds.x`)}
            />
          </div>
          <div>
            <label>2: </label>
            <input
              className="border"
              defaultValue={bet.type1x2.two}
              {...register(`${index}.odds.two`)}
            />
          </div>
        </div>
      </div>
      <button className="ml-12" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
};

export default Bet1X2Admin;
