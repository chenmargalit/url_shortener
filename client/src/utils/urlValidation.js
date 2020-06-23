import validUrl from 'valid-url';

export const validateUrl = (inputUrl) => {
  return validUrl.isUri(inputUrl);
};
