import React from 'react';
import {Text} from 'react-native';
import {styles} from './authPrompt.styles';

interface HighlightSegment {
  text: string;
  bold?: boolean;
}

interface AuthPromptProps {
  title: string;
  segments: HighlightSegment[];
}

export default function AuthPrompt({title, segments}: AuthPromptProps) {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>
        {segments.map((seg, i) =>
          seg.bold ? (
            <Text key={i} style={styles.boldText}>
              {seg.text}
            </Text>
          ) : (
            seg.text
          ),
        )}
      </Text>
    </>
  );
}
