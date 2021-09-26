#! /usr/bin/env node
import meow from 'meow';
import create from './lib/index.js';

const cli = meow(`
	Usage
	  $ npx create-op-studio <input>

	Examples
	  $ npx create-op-studio my-project --dataset="development" --visibility="private"

	Default Options
	  --dataset="production"
	  --visibility="public
`, {
	importMeta: import.meta,
	flags: {
		dataset: {
			type: 'string',
			alias: 'd',
			default: 'production'
		},
		visibility: {
			type: 'string',
			alias: 'v',
			default: 'public'
		}
	}
});

await create(cli.input[0], cli.flags);