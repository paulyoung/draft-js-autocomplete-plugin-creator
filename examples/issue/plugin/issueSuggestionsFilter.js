const issueSuggestionsFilter = (searchValue, suggestions) => {
  return suggestions.filter((suggestion) => {
    const name = suggestion.get('name');
    return name.startsWith(searchValue.toLowerCase());
  });
};

export default issueSuggestionsFilter;
