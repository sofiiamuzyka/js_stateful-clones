'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      const newState = {};

      result.push(newState);
      copyState = newState;
    }

    if (action.type === 'addProperties') {
      const newState = { ...copyState, ...action.extraData };

      result.push(newState);
      copyState = newState;
    }

    if (action.type === 'removeProperties') {
      const newState = { ...copyState };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }

      result.push(newState);
      copyState = newState;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
