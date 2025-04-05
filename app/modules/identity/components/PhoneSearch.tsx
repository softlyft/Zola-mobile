import React, { useState } from "react"
import { View, ViewStyle, TextStyle, FlatList, TouchableOpacity } from "react-native"
import { Text, TextField } from "@/components"
import { colors, spacing } from "@/theme"
import { MaterialIcons } from "@expo/vector-icons"
import { useStores } from "@/models"
import { observer } from "mobx-react-lite"
import { PhoneSearch as PhoneSearchType } from "../stores/identityStore"

const COUNTRY_CODES = [
  { code: "+234", country: "Nigeria" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
]

export const PhoneSearch = observer(function PhoneSearch() {
  const { identityStore } = useStores()
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0])
  const [phoneNumber, setPhoneNumber] = useState("")
  const [showCountryPicker, setShowCountryPicker] = useState(false)

  const handleSearch = () => {
    if (phoneNumber.trim()) {
      identityStore.addPhoneSearch(selectedCountry.code, phoneNumber.trim())
    }
  }

  const renderRecentSearch = ({ item }: { item: PhoneSearchType }) => (
    <TouchableOpacity
      style={$recentItem}
      onPress={() => {
        const country = COUNTRY_CODES.find((c) => c.code === item.countryCode)
        if (country) {
          setSelectedCountry(country)
          setPhoneNumber(item.phoneNumber)
        }
      }}
    >
      <View style={$recentItemContent}>
        <MaterialIcons name="history" size={20} color={colors.palette.neutral600} />
        <Text
          text={`${item.countryCode} ${item.phoneNumber}`}
          style={$recentItemText}
        />
      </View>
      <Text
        text={item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        style={$timestampText}
      />
    </TouchableOpacity>
  )

  return (
    <View style={$container}>
      <View style={$searchContainer}>
        <TouchableOpacity
          style={$countryPicker}
          onPress={() => setShowCountryPicker(!showCountryPicker)}
        >
          <Text text={selectedCountry.code} style={$countryCode} />
          <MaterialIcons
            name={showCountryPicker ? "arrow-drop-up" : "arrow-drop-down"}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        <TextField
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={$input}
          keyboardType="phone-pad"
          placeholder="Enter phone number"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={$searchButton} onPress={handleSearch}>
          <MaterialIcons name="search" size={24} color={colors.palette.neutral100} />
        </TouchableOpacity>
      </View>

      {showCountryPicker && (
        <View style={$countryList}>
          {COUNTRY_CODES.map((country) => (
            <TouchableOpacity
              key={country.code}
              style={$countryItem}
              onPress={() => {
                setSelectedCountry(country)
                setShowCountryPicker(false)
              }}
            >
              <Text text={country.country} style={$countryName} />
              <Text text={country.code} style={$countryCodeList} />
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={$recentContainer}>
        <Text text="Recent Searches" style={$recentTitle} />
        <FlatList
          data={identityStore.recentPhoneSearches}
          renderItem={renderRecentSearch}
          keyExtractor={(item) => item.id}
          style={$recentList}
          ListEmptyComponent={
            <View style={$emptyContainer}>
              <Text text="No recent searches" style={$emptyText} />
            </View>
          }
        />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  padding: spacing.md,
}

const $searchContainer: ViewStyle = {
  flexDirection: "row",
  marginBottom: spacing.md,
}

const $countryPicker: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.palette.neutral200,
  paddingHorizontal: spacing.sm,
  borderRadius: 6,
  marginRight: spacing.xs,
}

const $countryCode: TextStyle = {
  fontSize: 16,
  marginRight: spacing.xs,
}

const $input: ViewStyle = {
  flex: 1,
}

const $searchButton: ViewStyle = {
  backgroundColor: colors.palette.primary500,
  borderRadius: 6,
  padding: spacing.xs,
  justifyContent: "center",
  alignItems: "center",
  marginLeft: spacing.xs,
}

const $countryList: ViewStyle = {
  backgroundColor: colors.palette.neutral200,
  borderRadius: 6,
  marginBottom: spacing.md,
  maxHeight: 200,
}

const $countryItem: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  padding: spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.neutral300,
}

const $countryName: TextStyle = {
  fontSize: 14,
}

const $countryCodeList: TextStyle = {
  fontSize: 14,
  color: colors.palette.primary500,
}

const $recentContainer: ViewStyle = {
  marginTop: spacing.md,
}

const $recentTitle: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: spacing.sm,
}

const $recentList: ViewStyle = {
  maxHeight: 200,
}

const $recentItem: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.neutral300,
}

const $recentItemContent: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $recentItemText: TextStyle = {
  fontSize: 14,
  marginLeft: spacing.xs,
}

const $timestampText: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral600,
}

const $emptyContainer: ViewStyle = {
  padding: spacing.md,
  alignItems: "center",
}

const $emptyText: TextStyle = {
  color: colors.palette.neutral500,
  fontSize: 14,
}
