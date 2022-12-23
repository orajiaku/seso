"use strict";

const { Heap } = require('heap-js');
const utils = require('./utils');

const customPriorityComparator = (a, b) => a.date.getTime() - b.date.getTime();
const priorityQueue = new Heap(customPriorityComparator);

// Print all entries, across all of the *async* sources, in chronological order.

// NOTE:
// I switched the method to an async method because using promise resolvers, I couldn't
// come up with a way in time that will ensure that the logs are printed out chronologically.
// Given more time, there should be a better approach to it
module.exports = async (logSources, printer) => {
  while(true) {
    const promises = [];
    for(let i = 0; i < logSources.length; i++) {
      promises.push(async () => {
        const source = logSources[i];

        if (!source.drained && await source.popAsync()) {
          priorityQueue.push(source.last);
        }
      })
    }

    await Promise.all(promises)

    if (utils.isAllDrained(logSources)) {
      break;
    }
  }

  while(!priorityQueue.isEmpty()) {
    printer.print(priorityQueue.pop())
  }

  printer.done();


  return console.log("Async sort complete.");
};
