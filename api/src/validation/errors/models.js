export const name = {
  invalidLength: "'name' must be between 0 and 20 characters.",
  empty: "'name' is required.",
  inUse: "'name' already in use. Please try another.",
};

export const nickname = {
  invalidLength: "'nickname' must be between 0 and 20 characters.",
  empty: "'nickname' is required.",
  inUse: "'nickname' already in use. Please try another.",
};

export const isAdmin = {
  nonBoolean: "'isAdmin' must be a boolean value.",
};

export const lastName = {
  invalidLength: "'lastName' must be between 3 and 255 characters.",
  empty: "'lastName' is required.",
};

export const email = {
  invalid: "Invalid email.",
  inUse: "Email already in use. Please try another.",
  empty: "'email' is required.",
};

export const age = {
  nonInteger: "'age' must be an integer.",
  empty: "'age' is required.",
};

export const weight = {
  nonFloat: "'Weight' must be a float.",
  empty: "'weight' is required.",
};

export const height = {
  nonFloat: "'height' must be a float.",
  empty: "'height' is required.",
};

export const filename = {
  empty: "'filename' is required.",
};

export const latitude = {
  empty: "'latitude' is required.",
  nonFloat: "'latitude' must be a float.",
  invalidRange: "'latitude' must be a number between -90 and 90.",
};

export const longitude = {
  empty: "'longitude' is required.",
  nonFloat: "'longitude' must be a float.",
  invalidRange: "'longitude' must be a number between -180 and 180.",
};

export const selectedAvatar = {
  empty: "'selectedAvatar' is required.",
  nonExistent: "'avatar' do not exists.",
};

export const password = {
  invalidLength: "Password must be between 6 and 50 characters.",
  empty: "'password' is required.",
};

export const xp = {
  nonInteger: "'xp' must be an integer.",
  empty: "'xp' is required.",
};

export const userId = {
  nonInteger: "'userId' must be an integer.",
  empty: "'userId' is required.",
};
