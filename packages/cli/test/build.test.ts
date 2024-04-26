import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import { execa } from 'execa';

const cmd = '../../../bin/cli.js';

describe('co build', () => {
  it('default', async () => {
    const cwd = new URL('./fixtures/build-default/', import.meta.url);
    await execa('node', [cmd, 'build'], { cwd });

    // expect generated file exists
    expect(fs.existsSync(new URL('./tokens/index.css', cwd))).toBe(true);
    // expect there
    expect(fs.readFileSync(new URL('./tokens/index.css', cwd), 'utf8')).toEqual(
      expect.stringContaining(`/* -------------------------------------------
 *  Autogenerated by 💠 Terrazzo. DO NOT EDIT!
 * ------------------------------------------- */`),
    );
  });
});
