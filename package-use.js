#!/usr/bin/env node

var jsonist = require('jsonist')
var map = require('map-async')
var moment = require('moment')
var argv = require('minimist')(process.argv.slice(2), { boolean: 'average' })

var end = moment.utc().subtract(2, 'days')
var start = moment.utc().clone().subtract(1, 'year')
var packages = argv._
var avg = argv.average


if (!packages.length) {
  console.error('Usage: node-package-use [--average] <package name>[ <package name>[ <package name>...]]')
  process.exit(1)
}


function fetch (package, callback) {
  jsonist.get(`https://nodei.co/api/npm-dl/download-days/${package}?days=365`, callback)
}


function processAll (err, data) {
  if (err)
    throw err

  var all = {}
  var day = start.clone()
  if (avg)
    day.add(1, 'week')

  packages.forEach(function (pkg, i) {
    data[i].forEach(function (entry) {
      (all[entry.day] || (all[entry.day] = {}))[pkg] = entry.count
    })
  })

  process.stdout.write(`Day,${packages.join(',')}\n`)

  function dld (date, pkg) {
    var d = date.format('YYYY-MM-DD')
    return (all[d] && all[d][pkg]) || 0
  }

  while (day < end) {
    process.stdout.write(`${day.format('YYYY-MM-DD')}`)

    packages.forEach(function (pkg) {
      var d

      if (avg) {
        var p = day.clone().subtract(6, 'days')
        var tot = 0
        while (p <= day) {
          tot += dld(p, pkg)
          p.add(1, 'day')
        }
        d = Math.round(tot / 7)
      } else {
        d = dld(day, pkg)
      }

      process.stdout.write(`,${d || ""}`)
    })
    process.stdout.write('\n')
    day.add(1, 'day')
  }
}


map(packages, fetch, processAll)

