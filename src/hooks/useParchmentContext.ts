import { useContext } from "react";
import ParchmentContext from "../context/parchment-context.ts";

export default function useParchmentContext() {
    return useContext(ParchmentContext);
}