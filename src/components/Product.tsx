import { Pressable, PressableProps, Text, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

type Props = PressableProps & {
  data: {
    name: string
    quantity: number
  }
  onDelete: () => void
  onOpen: () => void
}

export function Product({ data, onDelete, onOpen, ...rest }: Props) {
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

      <TouchableOpacity onPress={onDelete}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onOpen}>
        <MaterialIcons name="visibility" size={24} color="blue" />
      </TouchableOpacity>
    </Pressable>
  )
}