import getEtld from "../src/getEtld";

const mockWindowWithHostname = hostname => {
  return {
    location: {
      hostname
    }
  };
};

const runEtldTest = ({ hostname, apexDomain, expectedEtld }) => {
  const window = mockWindowWithHostname(hostname);
  const getApexDomain = () => apexDomain;
  expect(getEtld(window, getApexDomain)).toBe(expectedEtld);
};

test("returns single-segment etld when on subdomain", () => {
  runEtldTest({
    hostname: "a.b.c.example.com",
    apexDomain: "example.com",
    expectedEtld: "com"
  });
});

test("returns single-segment etld when on apex domain", () => {
  runEtldTest({
    hostname: "example.com",
    apexDomain: "example.com",
    expectedEtld: "com"
  });
});

test("returns multi-segment etld while on subdomain", () => {
  runEtldTest({
    hostname: "a.b.c.co.uk",
    apexDomain: "c.co.uk",
    expectedEtld: "co.uk"
  });
});

test("returns multi-segment etld while on apex domain", () => {
  runEtldTest({
    hostname: "c.co.uk",
    apexDomain: "c.co.uk",
    expectedEtld: "co.uk"
  });
});

test("returns hostname while on restricted etld (e.g., localhost)", () => {
  runEtldTest({
    hostname: "localhost",
    apexDomain: undefined,
    expectedEtld: "localhost"
  });
});
