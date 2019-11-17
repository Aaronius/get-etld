/**
 * Retrieves the effective top-level domain.
 * @param {Object} window The browser's window object
 * @param {Function} getApexDomain Function returning
 * the apex domain.
 * @returns {string} The effective top-level domain.
 */
export default (window, getApexDomain) => {
  const apexDomain = getApexDomain();
  if (apexDomain) {
    // apex domains always have at least one period
    return apexDomain
      .split(".")
      .slice(1)
      .join(".");
  } else {
    // apexDomain is undefined in unique cases like "localhost"
    // where the hostname is a restricted effective top-level domain
    // and not an apex domain.
    return window.location.hostname;
  }
};
