module Types
  class QueryType < Types::BaseObject
    field :tasks,
      [Types::TaskType],
      null: false,
      description: "Returns a list of tasks"

    def tasks
      Task.order(due_date: :asc).all
    end
  end
end
