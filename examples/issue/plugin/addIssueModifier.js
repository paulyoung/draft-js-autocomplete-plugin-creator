import { Modifier, EditorState } from 'draft-js';

import getSearchText from './utils/getSearchText';

export default (editorState, issue) => {
  const currentSelectionState = editorState.getSelection();
  const { begin, end } = getSearchText(editorState, currentSelectionState);

  // get selection of the issue search text
  const issueTextSelection = currentSelectionState.merge({
    anchorOffset: begin,
    focusOffset: end,
  });

  let issueReplacedContent = Modifier.replaceText(
    editorState.getCurrentContent(),
    issueTextSelection,
    issue.get('name'),
  );

  const newEditorState = EditorState.push(
    editorState,
    issueReplacedContent,
    'insert-issue',
  );
  return EditorState.forceSelection(newEditorState, issueReplacedContent.getSelectionAfter());
};
