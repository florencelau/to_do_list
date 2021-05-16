module Types
  class FamilyType < Types::BaseEnum
    value "NIGHTSHADE"
    value "BRASSICA", value: Family::COLE
    value "UMBELLIFER", value: :umbellifer
    value "LEGUME", value: "bean & friends"
    value "CURCURBITS", value: 5
  end
end
