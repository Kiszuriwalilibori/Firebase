import { ArgumentsType } from "types/index";
import getPersons from "./getPersons";
import submitFigure from "./submitFigure";

type SubmitFigureArgs = ArgumentsType<typeof submitFigure>;
export { getPersons, submitFigure, SubmitFigureArgs };
