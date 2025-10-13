import { Platform, Text, TextInput } from 'react-native';

// Set a global default font for all Text and TextInput components.
// If "SF Pro" is available (iOS system or custom added font), it will be used.
// Otherwise, React Native will fall back to the platform default.
const defaultFontFamily = Platform.select({ ios: 'System', android: 'SF Pro' }) || 'SF Pro';

// Apply to Text
const anyText = Text as unknown as { defaultProps?: { style?: any } } & typeof Text;
anyText.defaultProps = anyText.defaultProps || {};
anyText.defaultProps.style = [anyText.defaultProps.style, { fontFamily: defaultFontFamily }];

// Apply to TextInput as well (for consistency)
const anyTextInput = TextInput as unknown as { defaultProps?: { style?: any } } & typeof TextInput;
anyTextInput.defaultProps = anyTextInput.defaultProps || {};
anyTextInput.defaultProps.style = [anyTextInput.defaultProps.style, { fontFamily: defaultFontFamily }];

export {};


