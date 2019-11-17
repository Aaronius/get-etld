import getApexDomain from "get-apex-domain";
import getEtld from "./getEtld";

let etld;

export default () => {
  if (!etld) {
    etld = getEtld(window, getApexDomain);
  }

  return etld;
};
