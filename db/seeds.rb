Task.create!(
  [
    {
      title: "Get Mom a gift for Mother's Day",
      description: "Decide between skincare and jewelry",
      due_date: DateTime.now + 10,
    },
    {
      title: "Buy concert tix",
      description: "Rolling loud",
      due_date: DateTime.now + 5,
    },
    {
        title: "Finalize trip itinerary",
        description: "Book plane tickets and hotel",
        due_date: DateTime.now + 2,
    },
    {
      title: "Order takeout",
      description: "Ramen or sushi!",
      due_date: DateTime.now + 7,
    },
    {
        title: "Pay bills",
        description: "PG&E, wifi, credit card",
        due_date: DateTime.now + 3,
        completed: true,
    },
    {
      title: "Meal prep for the week",
      description: "Buy groceries and look up recipes",
      due_date: DateTime.now + 4,
      completed: true,
    },
    {
      title: "Apartment hunt",
      description: "Schedule viewing with the landlord",
      due_date: DateTime.now + 3,
      completed: true,
    },
  ]
)