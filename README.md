# get-etld

Returns the effective top-level domain (eTLD) corresponding to the current web page without the use of a public suffix list.

Because of the methodology used, this library is very small.

## What's an effective top-level domain (eTLD)?

When someone purchases a domain, the domain always ends in an existing effective top-level domain (eTLD). For example, if you purchase `example.com`, the eTLD is `com`. Usually the eTLD is what comes after the last period, but not always. If you purchase `example.co.uk`, for example, `co.uk` is the eTLD. No websites or services are hosted on eTLDs; they only serve as the basis for domains that consumers can register.

## Requirements

This will only work in a browser when cookies are enabled.

## How detection is accomplished

There are no consistent, logical rules whereby the effective top-level domain can be parsed from a hostname. Instead, the [Public Suffix List](https://publicsuffix.org/) is a publicly curated list of all known effective top-level domains. Ths list changes over time. The only way to parse the effective top-level domain from a hostname is by comparing the ending of the hostname to the Public Suffix List.

The Public Suffix List is very large, making it prohibitive to load into a browser. Fortunately, there's a second-hand way of accessing this list.

As it turns out, browsers use this list to determine which domains can accept cookies. For example, browsers allow `store.example.co.uk` to set cookies for `store.example.co.uk` and `example.co.uk`, but not `co.uk` or `uk`, because `co.uk` and `uk` are both on the Public Suffix List.

Because of this, we can determine the top-level domain by attempting to write a cookie on `uk`, then `co.uk`, then `example.co.uk`, then `store.example.co.uk`, until we succeed in writing a cookie. In this case, the first attempt that will succeed is `example.co.uk`. By removing the first segment (`example`), we arrive at `co.uk`, the effective top-level domain.

## Installation

If you use npm for package management, you can install `get-etld` by running the following command from within your project's directory:

```
npm install get-etld
```

## Usage

```javascript
import getEtld from "get-etld";

console.log(getEtld());
```

If cookies are not enabled, an error will be thrown.

If the hostname is `localhost`, the eTLD will be `localhost`.

## Special Recognition

Full credit goes to [Joe Khoury](https://github.com/jfkhoury) for devising the strategy used to determine the apex domain.
