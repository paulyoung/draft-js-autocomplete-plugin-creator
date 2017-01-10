import React, { PropTypes } from 'react';
import { ContentState, EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import { List, fromJS } from 'immutable';

import createIssueSuggestionPlugin, { defaultSuggestionsFilter } from '../plugin';
import './IssueEditor.scss';
import './Draft.scss';

const issueSuggestionPlugin = createIssueSuggestionPlugin();
const { CompletionSuggestions } = issueSuggestionPlugin;
const plugins = [issueSuggestionPlugin];

const suggestions = fromJS([
  {
    name: 'foo.bar',
  },
  {
    name: 'baz.qux'
  },
]);

export default class IssueEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.moveFocusToEnd(
        EditorState.createWithContent(
          ContentState.createFromText('Some initial content')
        )
      ),
      suggestions: List(),
    };
  }

  onChange = (editorState) => this.setState({ editorState });

  onIssueSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, suggestions),
    });
  };

  focus = () => this.refs.editor.focus();

  render() {
    return (
      <div>
        <div className='editor' onClick={this.focus} >
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            spellCheck
            stripPastedStyles
            placeholder='Enter some text, with a # to see the issue autocompletion'
            ref='editor'
          />
        </div>
        <CompletionSuggestions
          onSearchChange={this.onIssueSearchChange}
          suggestions={this.state.suggestions}
        />
      </div>
    );
  }
}
