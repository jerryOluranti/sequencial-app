import React, { memo, useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import themeContext from "../../../config/theme/themeContext";
import { scale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";

const MultipleChoice = ({
  data,
  handleSelectMultiple,
  selected,
}: {
  data: any;
  handleSelectMultiple: any;
  selected: any;
}) => {
  const theme = useContext(themeContext);

  const handleSelect = (id: number, question_id: number, value: string) => {
    handleSelectMultiple(value, question_id, id);
  };

  if (!data || data.length === 0) return null;

  return (
    <>
      <Text style={{ color: theme.text, fontWeight: "bold" }}>
        Select Multiple
      </Text>
      {data.map((item: any) => {
        const question_id = item.id;
        const selectedOptions = new Set(
          selected
            .filter(
              (item: { question_id: number }) =>
                item.question_id === question_id
            )
            .map((item: { id: number }) => item.id)
        );

        return (
          <View
            key={item.id}
            style={{
              marginTop: scale(10),
              padding: scale(10),
              borderColor: theme.primary,
              borderWidth: 1,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: theme.primary }}>{item.quetion}</Text>
            <View style={{ marginTop: scale(5) }}>
              {item.option_to_choose_from.map((option: any, index: number) => {
                const isSelected = selectedOptions.has(index);

                return (
                  <Pressable
                    key={option.id}
                    onPress={() => handleSelect(index, question_id, option)}
                    style={[
                      styles.optionContainer,
                      {
                        borderColor: isSelected
                          ? theme.primary
                          : theme.grayText,
                        borderWidth: isSelected ? 1 : 0,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: theme.grayText,
                        fontSize: scale(13),
                      }}
                    >
                      {option}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color={theme.primary}
                        style={styles.checkIcon}
                      />
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>
        );
      })}
    </>
  );
};

export default memo(MultipleChoice);

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scale(10),
    borderRadius: 8,
    paddingLeft: scale(10),
  },
  checkIcon: {
    marginLeft: scale(10),
  },
});
