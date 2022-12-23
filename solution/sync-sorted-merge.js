"use strict";

const { Heap } = require('heap-js');
const utils = require('./utils');

const customPriorityComparator = (a, b) => a.date.getTime() - b.date.getTime();
const priorityQueue = new Heap(customPriorityComparator);

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  while(true) {
    logSources.forEach((source) => {
      if (!source.drained && source.pop()) {
        priorityQueue.push(source.last);
      }
    });

    if (utils.isAllDrained(logSources)) {
      break;
    }
  }

  while(!priorityQueue.isEmpty()) {
    printer.print(priorityQueue.pop())
  }

  printer.done();

  return console.log("Sync sort complete.");
};
