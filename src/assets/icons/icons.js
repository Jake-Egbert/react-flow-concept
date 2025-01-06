import {
  faAward,
  faPersonChalkboard,
  faPersonHiking,
  faRoadCircleCheck,
  faShoePrints,
  faPlusMinus,
  faHeartCircleMinus,
  faHeartCirclePlus,
  faObjectGroup,
  faMountainCity,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const icons = () => {
  return library.add(
    faAward,
    faPersonChalkboard,
    faPersonHiking,
    faRoadCircleCheck,
    faShoePrints,
    faPlusMinus,
    faHeartCircleMinus,
    faHeartCirclePlus,
    faObjectGroup,
    faMountainCity
  );
};

export default icons;
