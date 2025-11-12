import { jest } from '@jest/globals';

export default {
  findOne: jest.fn(),
  prototype: {
    save: jest.fn(),
  },
};
