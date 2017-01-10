# package-use

**Use the [nodei.co](https://nodei.co/) Node.js package download count API to create CSV data on package use**

## Usage

```text
$ node-package-use [--average] <package name>[ <package name>[ <package name>...]]
```

Provide one or more npm package name and you will get (nearly) one year's worth of downloads-per-day data for each package, side-by-side.

Prints CSV data to standard out, redirect to a file for use. e.g.:

```text
$ node-package-use express hapi > express-hapi-compare.csv
```

Use the `--average` command-line flag to print a rolling 7-day average of the data instead of raw per-day date for nicer graphing. Note that current Node.js download counts are heavily weighted to weekdays so you get very large dips on weekends. 7-day averages smooth those out to provide more interesting graphs. Data produced with averages will be 7 days shorter as the first 7 days are skipped.

## License

**package-use** is Copyright (c) 2017 Rod Vagg [@rvagg](https://github.com/rvagg) and licensed under the MIT license. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE.md file for more details.
