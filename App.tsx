import { Host, TextInput } from '@expo/ui';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// false is the control run: the field mounts once and is never remounted.
const REMOUNT_AFTER_FIRST_COMMIT = true;

export default function App() {
  // A new key remounts the field, the way a form re-seeds its uncontrolled
  // fields when its screen gains focus. Here it happens once, in an effect
  // right after the first commit, as it does when that focus arrives with
  // the mount.
  const [generation, setGeneration] = useState(0);
  useEffect(() => {
    if (REMOUNT_AFTER_FIRST_COMMIT) setGeneration(1);
  }, []);

  return (
    <View style={styles.screen}>
      <Text>{`Field generation ${generation}`}</Text>
      <Host matchContents={{ vertical: true }} style={styles.host}>
        <TextInput key={generation} defaultValue="Hello" />
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', padding: 24, gap: 12 },
  host: { alignSelf: 'stretch' },
});
