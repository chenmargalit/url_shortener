import validUrl from 'valid-url';

// validating uri, returns the uri if validity is okay, returns undefined otherwise
export const validateUrl = (inputUrl) => {
  return validUrl.isUri(inputUrl);
};
