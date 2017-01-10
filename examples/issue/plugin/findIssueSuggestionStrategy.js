import findWithRegex from 'find-with-regex';

const ISSUE_REGEX = /[a-zA-Z0-9_]+(\.(?:[a-zA-Z]([a-zA-Z]0-9_)*)*)+/g;

export default (contentBlock, callback) => {
  findWithRegex(ISSUE_REGEX, contentBlock, callback);
};
