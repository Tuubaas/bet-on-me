import { useFormContext } from "react-hook-form";

const Bet1X2Admin: React.FC<{
  bet: IBet1X2;
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
            <label>1: </label>
            <input
              className="border"
              defaultValue={bet.odds.one}
              {...register(`${index}.odds.one`)}
            />
          </div>
          <div>
            <label>X: </label>
            <input
              className="border"
              defaultValue={bet.odds.x}
              {...register(`${index}.odds.x`)}
            />
          </div>
          <div>
            <label>2: </label>
            <input
              className="border"
              defaultValue={bet.odds.two}
              {...register(`${index}.odds.two`)}
            />
          </div>
        </div>
      </div>
      <button className="ml-12" onClick={removeBet}>
        Remove
      </button>
    </div>
  );
};

export default Bet1X2Admin;
