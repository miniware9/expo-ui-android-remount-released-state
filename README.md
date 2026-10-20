# On Android, a `TextInput` remounted right after its first render logs "Cannot use shared object that was already released"

`@expo/ui` 58.0.21, `expo-modules-core` 58.0.23, Expo SDK 58 (React Native
0.88.0, New Architecture), Android 17 emulator (x86_64), debug build.

1. `npm install`, then `npx expo run:android`.
2. The screen shows one `TextInput` from `@expo/ui` inside a `Host`. An effect
   changes its `key` once, right after the first commit, so the field mounts
   and is replaced at once.
3. Force-stop the app (`adb shell am force-stop
   com.letsgraphit.expouiremountreleasedstate`) and open it again, so every
   launch is a cold start.

Expected: the field shows "Hello" and nothing is logged.

Actual: every cold start logs this, and LogBox shows it:

```
Cannot set prop 'value' on view 'class expo.modules.kotlin.views.ComposeFunctionHolder'
→ Caused by: Cannot use shared object that was already released
```

It happened on 10 of 10 cold starts. With `REMOUNT_AFTER_FIRST_COMMIT` set to
`false` in `App.tsx`, it happened on 0 of 10. The field that fails is the first
one, which is never shown, so the screen itself looks right.
