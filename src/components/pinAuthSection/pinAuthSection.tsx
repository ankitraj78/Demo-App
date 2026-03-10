import React, {useRef, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, iconSize} from '../../../theme';
import {styles} from './pinAuthSection.styles';

type PinAuthSectionProps = {
  pinLength?: number;
  onPinComplete?: (pin: string) => void;
};

export default function PinAuthSection({
  pinLength = 4,
  onPinComplete,
}: PinAuthSectionProps) {
  const [pin, setPin] = useState<string[]>(Array(pinLength).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text && index < pinLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === pinLength - 1 && text) {
      const fullPin = newPin.join('');
      if (fullPin.length === pinLength) {
        onPinComplete?.(fullPin);
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.authContent}>
      <View style={styles.lockIconWrapper}>
        <MaterialIcons name="lock" size={48} color={colors.primary} />
      </View>

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

      <TouchableOpacity style={styles.biometricsBtn}>
        <MaterialIcons
          name="fingerprint"
          size={iconSize.xl}
          color={colors.primary}
        />
        <Text style={styles.biometricsText}>Use Biometrics</Text>
      </TouchableOpacity>
    </View>
  );
}
