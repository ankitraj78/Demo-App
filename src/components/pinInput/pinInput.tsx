import React, {useRef, useState} from 'react';
import {View, TextInput} from 'react-native';
import {styles} from './pinInput.styles';

type PinInputProps = {
  length?: number;
  onComplete?: (pin: string) => void;
};

export default function PinInput({length = 4, onComplete}: PinInputProps) {
  const [pin, setPin] = useState<string[]>(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === length - 1 && text) {
      const fullPin = newPin.join('');
      if (fullPin.length === length) {
        onComplete?.(fullPin);
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.pinRow}>
      {pin.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => {
            inputRefs.current[index] = ref;
          }}
          style={[
            styles.pinInput,
            focusedIndex === index && styles.pinInputFocused,
          ]}
          value={digit}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={({nativeEvent}) =>
            handleKeyPress(nativeEvent.key, index)
          }
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(-1)}
          keyboardType="number-pad"
          maxLength={1}
          secureTextEntry
        />
      ))}
    </View>
  );
}
