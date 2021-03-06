import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import userSelectors from "../../redux/user/user-selectors";
import { changeVolume } from "../../redux/user/user-slice";
import { FaVolumeUp, FaVolumeMute, FaVolumeDown } from "react-icons/fa";
import { Wrapper, WrapperVolume, Input } from "./Volume.style";

const Volume = () => {
  const dispatch = useDispatch();
  const volume = useSelector(userSelectors.getVolume);

  const oldVolume = useRef(0.3);

  const handleChange = (e) => {
    dispatch(changeVolume(+e.target.value));
  };

  const handleClick = () => {
    if (volume !== 0) {
      oldVolume.current = volume;
      dispatch(changeVolume(0));
    } else {
      dispatch(changeVolume(oldVolume.current));
    }
  };

  return (
    <>
      <Wrapper>
        <WrapperVolume>
          {volume === 0 ? (
            <FaVolumeMute size={24} onClick={handleClick} />
          ) : volume < 0.5 ? (
            <FaVolumeDown size={24} onClick={handleClick} />
          ) : (
            <FaVolumeUp size={24} onClick={handleClick} />
          )}
          <Input
            value={volume}
            type="range"
            min={0}
            max={1}
            step={0.01}
            onChange={handleChange}
          />
        </WrapperVolume>
      </Wrapper>
    </>
  );
};

export default Volume;
