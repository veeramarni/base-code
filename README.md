

## Modification
Modify `typings/require.d.ts` by adding 	`resolve(any): any;`

Replace `require.toURL(..)` to `require.resolve(./<exact path>)` in `vs/base/node/process.ts` and `vs/bas/node/stdFork.ts`

Comment all on `vs/base/common/paths.ts`