import { Pressable, PressableProps, Text, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

type Props = PressableProps & {
  data: {
    name: string
    quantity: number
  }
}

export function Product({ data, ...rest }: Props) {
  return (
    <Pressable
      style={{
        backgroundColor: "#CECECE",
        padding: 24,
        borderRadius: 20,
        flexDirection: "row",
        gap: 16,
        marginBottom: 16,
        width: 300,
      }}
      {...rest}
    >
      <Text style={{ flex: 1 }}>
        {data.quantity}x {data.name}
      </Text>
    </Pressable>
  )
}