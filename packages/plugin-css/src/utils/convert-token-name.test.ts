import {describe, expect, test} from 'vitest';
import {varName} from './convert-token-name.js';

describe('varName', () => {
  test('variable names start with two dashes and separate groups names with single dashes', () => {
    expect(varName('path.to.token')).toBe('--path-to-token');
    expect(varName('Path.To.Token')).toBe('--Path-To-Token');
    expect(varName('token')).toBe('--token');
  });

  test('removes leading and trailing whitespace from id', () => {
    expect(varName(' path.to.token ')).toBe('--path-to-token');
  });

  test('removes leading and trailing whitespace from group and token names', () => {
    expect(varName('path. to .token')).toBe('--path-to-token');
  });

  test('replaces whitespace inside group and token names with "_" by default', () => {
    expect(varName('path.to the.token')).toBe('--path-to_the-token');
  });

  test('replaces whitespace inside group and token names with custom replacement when provided', () => {
    expect(varName('path.to the.token', {spaceReplacement: '-'})).toBe('--path-to-the-token');
  });

  describe('prefix option', () => {
    test('adds a prefix when provided', () => {
      expect(varName('path.to.token', {prefix: 'scope'})).toBe('--scope-path-to-token');
      expect(varName('token', {prefix: 'scope'})).toBe('--scope-token');
    });

    test('avoids duplicating leading dashes with prefix', () => {
      expect(varName('path.to.token', {prefix: '--scope'})).toBe('--scope-path-to-token');
    });

    test('avoids duplicating trailing dashes with prefix', () => {
      expect(varName('path.to.token', {prefix: '--scope-'})).toBe('--scope-path-to-token');
      expect(varName('path.to.token', {prefix: 'scope-'})).toBe('--scope-path-to-token');
    });
  });

  describe('suffix option', () => {
    test('adds a suffix when provided', () => {
      expect(varName('path.to.token', {suffix: 'foobar'})).toBe('--path-to-token-foobar');
      expect(varName('token', {suffix: 'foobar'})).toBe('--token-foobar');
    });

    test('avoids duplicating leading dashes with suffix', () => {
      expect(varName('path.to.token', {suffix: '-foobar'})).toBe('--path-to-token-foobar');
    });
  });
});
