const isAllDrained = (logSources) => {
  for (let i = 0; i < logSources.length; i++) {
    const source = logSources[i];
  
    if (!source.drained) {
      return false
    }
  }

  return true;
}

module.exports = { isAllDrained };
